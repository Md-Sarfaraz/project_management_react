
export default function StatusCard({
    icon,
    color, // tailwind color scheme
    title,
    count,
    note
}) {
    return (<>
        <div className="p-4 max-w-sm mx-full bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div className={(color)+" shrink-0 rounded-lg text-white p-6  w-24 h-24 -mt-12 "}>
                {icon}
            </div>
            <div className="">
                <div className="text-lg font-medium text-black">{title}</div>
                <div className="text-base font-medium text-black">{count}</div>
                <p className="text-sm text-slate-500"> {note}</p>
            </div>
        </div>
    </>
    );
}
