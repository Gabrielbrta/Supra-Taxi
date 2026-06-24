export interface TabsHeader{
    label: string | number,
    key: string
    children?: SubMenuFormChildren[]
}

interface SubMenuFormChildren {
    label: string | number,
    key: string,
}