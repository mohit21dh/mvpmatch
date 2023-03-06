import EmptyReport from "../Icons/EmptyReport"

export const EmptyContent = () => {
    return <div className="mt-24 space-y-4 flex flex-col items-center justify-center w-full">
        <h1 className="text-xl font-extrabold">No Reports</h1>
        <h2 className="mx-[10%] md:mx-[30%] text-lg text-[#7E8299]">
            Currently you have no data for the reports to be generated.
            Once you start generating traffic through the Balance application
            the reports will be shown.
        </h2>
        <EmptyReport />
    </div>
}