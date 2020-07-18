import * as React from "react";
import { sp, IItem, IAttachmentInfo } from "@pnp/sp/presets/all";
import styles from "../sass/HomePage.module.sass";
import { getMyDonationOffers } from "../services/DashBoardService";

export default class HomePageComponent extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { campaignsList: [], imageUrl: "" };
        this.getAllCampaigns = this.getAllCampaigns.bind(this);
    }

    componentDidMount() {
        this.getAllCampaigns();
    }

    async getAllCampaigns() {
        console.log("Updated 3");
        await sp.web.lists.getByTitle("CampaignList").items.get().then(async result => {
            console.log("Result : ", result);
            this.setState({ campaignsList: result });
        });

        let adata = {
            ApplicantName: "Madhuri Chunduri",
            Reason: "Request",
            Status: "Started"
        }

        // await sp.web.lists.getByTitle("BloodDonationList").items.add({
        //     Title: "3",
        //     Age: 20,
        //     BloodGroup: "A+",
        //     CityName: "Tanuku",
        //     PhoneNumber: "99999999999",
        //     Weight: 65,
        //     ApplicantData: JSON.stringify(adata)
        // }).then(result => {
        //     console.log("Insertion successful : ", result)
        // })

        // await sp.web.lists.getByTitle("BloodDonationList").items.filter("Status ne Completed").get().then(result => {
        //     console.log("Result Donations : ", result);
        //     return result;
        // })

        // await sp.web.lists.getByTitle("BloodDonationList").items.filter(`FinalStatus ne 'Started'`).get().then(result => {
        //     console.log("Result Donations : ", result);
        //     return result;
        // })

        // let queryString: string = "NPTColumnsGroup"
        // await sp.web.lists.getByTitle("BloodDonationList").fields.filter(`Group eq '${queryString}'`).get().then(result => {
        //     console.log("Blood Group Fields : ", result);
        //     return result;
        // })
        // const info = await item.attachmentFiles.select("ServerRelativeUrl")();
        // console.log("Info : ", info)
    }

    getShortTitle(title: string) {
        if (title.length > 15) {
            let index = title.lastIndexOf(".");
            if (index > 0 && index < 15) return title.substring(0, index).replace(/_/g, "-");
            else return title.substring(0, 15).replace(/_/g, "-") + "...";
        }
        else return title.replace(/_/g, "-");
    }

    getShortDescription(description: string) {
        if (description.length > 25) {
            return description.substring(0, 25) + "...";
        }
        else return description;
    }

    async getImageRelativeUrl(campaign) {
        let url = await sp.web.lists.getByTitle("CampaignList").items.getById(campaign.Id).attachmentFiles.get().then(result => {
            return result[0].ServerRelativeUrl;
        })
        return url;
    }

    getImageUrl(campaign) {
        let data = this.getImageRelativeUrl(campaign).then(result => {
            return result;
        });
        return data;
    }

    render() {
        let availableCampaigns = this.state.campaignsList.map(campaign => {
            // let imageUrl: string = this.getImageRelativeUrl(campaign).then(result => {
            //     return result;
            // })
            return (
                <div className={styles.cardBody}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12">
                            <div>
                                <img src={"imageUrl"} alt="product-image" className={styles.productImage} />
                            </div>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <p className={styles.productTitle}>{this.getShortTitle(campaign.Title)}</p>
                    </div>
                    <div className="ms-Grid-row">
                        <p className={styles.productDescription}>{this.getShortDescription(campaign.CampaignDescription)}</p>
                    </div>
                </div>)
        }
        )

        return (
            <div>
                <input type="button" className={styles.newCampaignButton} value="++ New Campaign" />
                <div className={styles.resultsBody}>
                    {availableCampaigns}
                    {availableCampaigns}
                </div>
            </div>
        )
    }
}