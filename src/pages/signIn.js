import React from "react";
import { signIn  } from "next-auth/react"
import { useRouter } from 'next/router'

export function getProviders() {
    return require(process.cwd() + "/../../public/resources/auth.json");
}

export function getServerSideProps(context) {
    try {
        let providers = getProviders(context);
        return { props: { providers } };
    } catch (error) {
        console.error('Error fetching providers:', error);
        return { props: { providers: [] } }; // Return empty providers array on error
    }
}

export default function SignInPage({ providers }) {
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl);

    return (
        <div className="flex flex-col gap-2">
            {providers.map((provider) => (
                <form
                    key={provider.id} // Adding a unique key to each form element
                    onSubmit={async (e) => {
                        e.preventDefault(); // Prevent default form submission
                        await signIn(provider.id, { callbackUrl: callbackUrl });
                    }}
                >
                    <button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </button>
                </form>
            ))}
        </div>
    );
}