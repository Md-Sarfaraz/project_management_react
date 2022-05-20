export default function Footer({ dark ,version}) {
    return (
        <footer className={(dark ? "border-grey-50" : "border-gray-200 ") + " py-6 px-16 border-t font-light flex flex-col lg:flex-row justify-between items-center"}>
            <p className={(dark ? "text-grey-50" : "text-gray-700") + " mb-6 lg:mb-0"}>
                Copyright &copy; {new Date().getFullYear()} <span className="px-4  text-indigo-900"> Version : {version}</span>
            </p>
            <div className="">
                <p className={(dark ? "text-grey-50" : "text-gray-700") + "  mb-6 lg:mb-0"}>
                    Made with  <a
                        href="https://www.creative-tim.com?ref=mtdk"
                        target="_blank" rel="noreferrer" className={(dark ? "text-light-blue-200 hover:text-light-blue-400" : "text-light-blue-500 hover:text-light-blue-700") + ""}
                    >
                        Material Tailwind
                    </a> by Creative Tim
                </p>
            </div>
        </footer>
    );
}
