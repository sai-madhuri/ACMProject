import { sp } from "@pnp/sp/presets/all";

export const getAllActiveDonations = async (listName: string) => {
    listName = listName + "Donors"
    return await sp.web.lists.getByTitle(listName).items.filter(`FinalStatus ne 'Completed'`).get().then(result => {
        return result;
    })
}

export const getAllListFields = async (listName: string) => {
    let groupValue = listName + "Group"
    return await sp.web.lists.getByTitle(listName).fields.filter(`Group eq '${groupValue}'`).get().then(result => {
        return result;
    })
}

export const getMyDonationOffers = async (listName: string, userId) => {
    listName = listName + "Donors"
    return await sp.web.lists.getByTitle(listName).items.filter(`AuthorId eq ${userId}`).get().then(result => {
        return result;
    })
}

export const getAllDonationRequests = async (listName: string, donationId) => {
    listName = listName + "Requests"
    return await sp.web.lists.getByTitle(listName).items.filter(`DonationId eq '${donationId}'`).get().then(result => {
        return result;
    })
}

export const approveRequest = async (listName: string, request) => {
    let requestsListName = listName + "Requests"
    let applicantData = JSON.parse(request.ApplicantData)
    applicantData.Status = "Completed"
    applicantData = JSON.stringify(applicantData)
    return await sp.web.lists.getByTitle(requestsListName).items.getById(request.Id).update({
        FinalStatus: "Approved",
        ApplicantData: applicantData
    }).then(async result => {
        let donorsListName = listName + "Donors"
        await sp.web.lists.getByTitle(donorsListName).items.getById(request.DonationId).update({
            FinalStatus: "Completed"
        })
    })
}