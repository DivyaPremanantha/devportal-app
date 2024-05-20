import React from "react";
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { promises as fs } from 'fs';

export function getProviders() {
    return require(process.cwd() + "/../../public/resources/auth.json");
}

export async function getServerSideProps(context) {
    const content = {}
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        content.pageHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/sign-in.html", 'utf8');
    } else {
        try {
            const htmlRef = process.env.ADMIN_API_URL + "admin/sign-in.html?orgName=" + context.query.callbackUrl.split("/")[3];
            const htmlResponse = await fetch(htmlRef);
            var htmlContent = await htmlResponse.text()

            var modifiedHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.query.callbackUrl.split("/")[3] + `/resources/stylesheet/`);
            content.pageHTMLContent = modifiedHTMLContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.query.callbackUrl.split("/")[3] + `/resources/images/`);
        } catch (error) {
            console.error('Error fetching content:', error);
            content.pageHTMLContent = '<h3>Please upload authentication content</h3>';
        }
    }
    content.pageHTMLLineCount = content.pageHTMLContent.split(/\r\n|\r|\n/).length;

    try {
        let providers = getProviders(context);
        return { props: { providers, content } };
    } catch (error) {
        console.error('Error fetching providers:', error);
        return { props: { providers: [], content } }; // Return empty providers array on error
    }
}

export default function SignInPage({ providers, content }) {
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl);

    return (
        <div>
            {/* <div dangerouslySetInnerHTML={{ __html: content.pageHTMLContent }}></div> */}
            {content.pageHTMLLineCount > 14 || content.pageHTMLLineCount == 1 ? (
                <div dangerouslySetInnerHTML={{ __html: content.pageHTMLContent }}></div>
            ) : (
                <div className="container">
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
            )
            }
        </div>
    );
}