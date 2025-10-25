import { ActionBar, MobileAppList, TableApp } from "@/components/common"
import { useEffect, useMemo, useState } from "react"
import { ApplicationsContext } from "@/components/contexts"
import { ApplicationsData, UserData, type IApplications } from "@/mock"
import { useMediaQuery } from "@chakra-ui/react"

export const Applications = () => {
    const [searchInput, setSearchInput] = useState<string>("")
    const [selectFilter, setSelectFilter] = useState<string>("all")
    const [appFilterData, setAppFilterData] = useState<IApplications[] | null>(null)

    const [isMobile] = useMediaQuery(["(max-width: 960px)"])

    const value = useMemo(() => ({
        searchInput,
        setSearchInput,
        selectFilter,
        setSelectFilter,
    }), [searchInput, selectFilter])

    useEffect(() => {
        var appStatusFilter = ApplicationsData

        switch (selectFilter) {
            case "all": break;
            case "my": appStatusFilter = ApplicationsData.filter(data => data.id_creator === UserData.id); break;
            default: appStatusFilter = ApplicationsData.filter(data => data.status === selectFilter);
        }

        var appSearchFilter = appStatusFilter.filter(data =>
            data.id.toLowerCase().includes(searchInput.toLowerCase())
            || data.topic.toLowerCase().includes(searchInput.toLowerCase())
        )

        setAppFilterData(appSearchFilter)
    }, [selectFilter, searchInput])

    return (
        <>
            <ApplicationsContext.Provider value={value}>
                <ActionBar />
            </ApplicationsContext.Provider>

            {!isMobile && <TableApp appFilterData={appFilterData} />}

            {isMobile && <MobileAppList appFilterData={appFilterData} />}
        </>
    )
}
