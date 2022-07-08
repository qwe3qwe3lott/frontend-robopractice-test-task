export type DataRecordDto = {
    id: number
    Fullname: string
    Days: {
        Date: string
        End: string
        Start: string
    }[]
}