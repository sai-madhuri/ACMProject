import * as React from "react";
import { sp, IItem, IAttachmentInfo } from "@pnp/sp/presets/all";
import styles from "./Homapage.module.scss";
import { getMyDonationOffers } from "../services/DashBoardService";
import { Appliacation } from '../../Models/Campaign'
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon, Label, TextField, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
export interface IHomePageState {
    campaignsList: Array<Appliacation>
}

export default class HomePageComponent extends React.Component<any, IHomePageState>{
    constructor(props) {
        super(props);

        //  this.getAllCampaigns = this.getAllCampaigns.bind(this);
        var app1: Appliacation = new Appliacation();
        app1.Name = "Blood Donation";
        var app2: Appliacation = new Appliacation();
        app2.Name = "Food Donation";
        var app3: Appliacation = new Appliacation();
        app3.Name = "Book Donation";
        var app4: Appliacation = new Appliacation();
        app4.Name = "Cloth Donation";
        var app5: Appliacation = new Appliacation();
        app5.Name = "Bicycle Donation";
        var campaignsList: Array<Appliacation> = [];
        campaignsList.push(app1);
        campaignsList.push(app2);
        campaignsList.push(app3);
        campaignsList.push(app4);
        campaignsList.push(app5);
        this.state = { campaignsList: campaignsList };
    }

    componentDidMount() {
        // this.getAllCampaigns();
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

        return (
            <div className={styles.acmProject}>
                <div className={styles.container}>
                    <div className={styles.header + "  ms-Grid-row "}>
                        <span> Campaigns </span>
                    </div>
                    <div className={styles.bodyContainer}>
                        <div className={"  ms-Grid-row " + styles.campaigns}>
                            {this.state.campaignsList.map((campain, key) => {
                                return (
                                    <div key={key} className={"  ms-Grid-col ms-sm3 " + styles.campaign}>
                                        <div className={styles.innerCampaign}>
                                            <div>
                                                <Image height={100} src="https://www.w3schools.com/html/pic_trulli.jpg" />
                                            </div>
                                            <div className={styles.logoName}>
                                                {campain.Name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                           <div  className={"  ms-Grid-col ms-sm3 " + styles.campaign}>
                                        <div className={styles.innerCampaign}>
                                            <div className={styles.AddIcon}>
                                                <Icon iconName="Add" />
                                            </div>
                                            <div className={styles.logoName}>
                                                Add New Campain
                                            </div>
                                        </div>
                                    </div>
                        </div>


                    </div>
                </div>
            </div>

        )



    }
}