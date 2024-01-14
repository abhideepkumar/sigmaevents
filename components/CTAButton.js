import Link from "next/link";

const CTAButton = ({text, href, large=false}) => {
    return (
        <div className={`px-4 py-1 bg-emerald-300 w-fit rounded-md cursor:pointer hover:bg-emerald-500 transition-colors duration-300 mt-4 ${large ? "text-2xl" : "text-lg"} dark:bg-green-600 dark:text-white`}>
            <Link
                href={href}
            >
                {text}
            </Link>
        </div>
    )
}

export default CTAButton;