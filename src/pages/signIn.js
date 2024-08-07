import React from "react";
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { promises as fs } from 'fs';
import { useEffect } from "react";
import '../pages/[orgName]/error.css';

export async function getServerSideProps(context) {
    const content = {}
    const orgName = context.query.callbackUrl.split("/")[3];
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        content.pageHTMLContent = await fs.readFile(process.cwd() + "/public/resources/pages/sign-in.inc", 'utf8');
    } else {
        try {
            const htmlRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + orgName + "&fileName=sign-in.html";
            const htmlResponse = await fetch(htmlRef);

            if (!htmlResponse.ok) {
                content.pageHTMLContent = await fs.readFile(process.cwd() + "/src/pages/[orgName]/error.html", 'utf8');
                content.pageHTMLLineCount = content.pageHTMLContent.split(/\r\n|\r|\n/).length;
            } else {
                var htmlContent = await htmlResponse.text();
                if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
                    content.pageHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + orgName + "&fileName=");
                } else {
                    var modifiedHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + orgName + `/resources/stylesheet/`);
                    content.pageHTMLContent = modifiedHTMLContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + orgName + `/resources/images/`);
                }
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            content.pageHTMLContent = '<h3>Please upload authentication content</h3>';
        }
    }
    content.pageHTMLLineCount = content.pageHTMLContent.split(/\r\n|\r|\n/).length;

    try {
        let providers = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/auth.json", 'utf8'));
        return { props: { providers, content } };
    } catch (error) {
        console.error('Error fetching providers:', error);
        return { props: { providers: [], content } }; // Return empty providers array on error
    }
}

export default function SignInPage({ providers, content }) {
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl);
    if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
        useEffect(() => {
            var imageTags = document.getElementsByTagName("img");
            var imageTagList = Array.prototype.slice.call(imageTags);
            imageTagList.forEach(element => {
                var imageName = element.src.split("/images/")[1];
                if (element.src.includes("/resources/images")) {
                    element.src = process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'orgFiles?orgName=' + content.orgName + "&fileName=" + imageName;
                }
            });

        }, []);
    }
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: content.pageHTMLContent }}></div>
            {content.pageHTMLLineCount == 1 && content.componentsHTMLLineCount != 31 ? (
                console.log("Error fetching content")
            ) : content.pageHTMLLineCount > 14 && content.componentsHTMLLineCount != 31 ? (
                <div dangerouslySetInnerHTML={{ __html: content.pageHTMLContent }}></div>
            ) : (
                <div className="container">
                    {providers[0].clientId !== "" ? (
                        <div>
                            <h2>Choose Authentication Method:</h2>
                            {providers.map((provider) => (
                                <form
                                    key={provider.id} // Adding a unique key to each form element
                                    onSubmit={async (e) => {
                                        e.preventDefault(); // Prevent default form submission
                                        await signIn(provider.id, { callbackUrl: callbackUrl });
                                    }}
                                >
                                    <button type="submit" class="auth-button">
                                        <span>Sign in with {provider.name}</span>
                                    </button>
                                </form>
                            ))}
                        </div>
                    ) : (
                        <h2> Please update authernticator information in the auth.json file </h2>
                    )}
                </div>
            )
            }
        </div>
    );
}