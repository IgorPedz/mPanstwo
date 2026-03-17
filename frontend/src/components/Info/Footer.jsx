import Settings from "../Global/Settings"
import LoginFooter from "../Global/LoginFooter"

export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row justify-center items-center mt-12 mb-8 px-6 md:px-16 color-transition">
            <Settings />
            <LoginFooter />
        </footer>
    )
}