import Settings from "../Global/Settings"
import LoginFooter from "../Global/LoginFooter"

export default function Footer() {
    return (
        <footer className="w-fit mx-auto flex flex-row items-center px-6 md:px-16">
            <Settings />
            <LoginFooter />
        </footer>
    )
}