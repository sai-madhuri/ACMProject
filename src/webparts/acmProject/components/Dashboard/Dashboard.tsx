import * as React from 'react';
import styles from './Dashboard.module.scss';
import { Appliacation, Field, FieldType, FormType, EnumField } from '../../../Models/Campaign'
import { Icon, Label, TextField, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { CommandBarButton, IContextualMenuProps, IIconProps, Stack, IStackStyles, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';


export interface IDashboardComponentState {
    application: Appliacation,
    Requestors: Array<any>,
    Donars: Array<any>,
    DonarRequestor: Array<any>,
    frequentDonars: Array<any>,

}

export enum TableName {
    BloodDonation = "BloddDonation"
}



export default class DashboardComponent extends React.Component<any, IDashboardComponentState> {
    listName = TableName.BloodDonation;
    constructor(props) {
        super(props);
      
        var application = new Appliacation();
        application.Name = "Blood Donation Campaign";
        var donars = [];
        donars.push({ Name: "Sunanda", MobileNumber: "9988776655", BloodGroup: "A+", CreatedOn: new Date("2/2/2020") });
        donars.push({ Name: "Madhuri", MobileNumber: "9445587694", BloodGroup: "0+", CreatedOn: new Date("2/2/2020") });

        var requestors = [];
        requestors.push({ Name: "Sai Venkat", MobileNumber: "9988776655", CreatedOn: new Date("7/17/2020"), BloodGroup: "A+" });
        requestors.push({ Name: "John", MobileNumber: "9988776655", CreatedOn: new Date("7/19/2020"), BloodGroup: "0+" });
        requestors.push({ Name: "Ramesh", MobileNumber: "9988776655", CreatedOn: new Date("7/18/2020"), BloodGroup: "A+" });

        var DonarRequestor = [];
        if(this.listName==TableName.BloodDonation){
            DonarRequestor.push({ Name: "Uday", Requestor: "Mikel", MobileNumber: "9988776655", CreatedOn: new Date("2/2/2020"), BloodGroup: "A+" });
            DonarRequestor.push({ Name: "Sai Venkat", Requestor: "Nikhil", MobileNumber: "9988776655", CreatedOn: new Date("2/2/2020"), BloodGroup: "A+" });
        }
       

        var frequentDonars = [];
        if(this.listName==TableName.BloodDonation){
        frequentDonars.push({ Name: "Dasari Arun", Count: 6 });
        frequentDonars.push({ Name: "Uday", Count: 2 });
        frequentDonars.push({ Name: "ABC", Count: 3 });
        }

        this.state = {
            application: application,
            Requestors: requestors,
            Donars: donars,
            DonarRequestor: DonarRequestor,
            frequentDonars: frequentDonars

        }

    }

    render() {
        return (
            <div className={styles.acmProject}>
                <div className={styles.container}>
                    <div className={styles.header + "  ms-Grid-row "}>
                        <span> {this.state.application && this.state.application.Name} </span>
                    </div>
                    <div className={styles.bodyContainer}>
                        <div className={styles.mainContainer}>
                            <div className=" ms-Grid-row ">
                                <div className=" ms-Grid-col ms-sm6 ">
                                    <div className={styles.gridHeight}>
                                        <div className={styles.tileHeader}>Available Donars</div>
                                        <div className={styles.textStyles + "  ms-Grid-row  "}>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Name</div>
                                               <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>{ this.listName==TableName.BloodDonation ?"Blood Group":"OfferedOn" }
                                         </div>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Contact</div>
                                        </div>
                                        {
                                            this.state.Donars && this.state.Donars.length > 0 && this.state.Donars.map((donar, key) => {
                                                return (
                                                    <div key={key} className={styles.textStyles + "  ms-Grid-row  "}>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.Name}</div>
                                                        <div className=" ms-Grid-col ms-sm4 ">{ this.listName==TableName.BloodDonation ?donar.BloodGroup:donar.CreatedOn.toLocaleDateString() }</div>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.MobileNumber}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <div className=" ms-Grid-col ms-sm6">
                                    <div className={styles.gridHeight}>
                                        <div className={styles.tileHeader}>Requestors</div>
                                        <div className={styles.textStyles + "  ms-Grid-row  "}>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Name</div>

                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>  Requsted On</div>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>{ this.listName==TableName.BloodDonation ? "Blood Group":"Mobile Number" }</div>
                                        </div>
                                        {

                                            this.state.Requestors && this.state.Requestors.length > 0 && this.state.Requestors.map((donar, key) => {
                                                return (
                                                    <div key={key} className={styles.textStyles + "  ms-Grid-row  "}>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.Name}</div>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.CreatedOn.toLocaleDateString()}</div>
                                                        <div className=" ms-Grid-col ms-sm4 ">{ this.listName==TableName.BloodDonation ? donar.BloodGroup :donar.MobileNumber  }</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className=" ms-Grid-row ">
                                <div className=" ms-Grid-col ms-sm6 ">

                                    <div className={styles.gridHeight}>
                                        <div className={styles.tileHeader}>Donar - Requesor</div>
                                        <div className={styles.textStyles + "  ms-Grid-row  "}>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Donar Name</div>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Donated To</div>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Donated ON</div>
                                        </div>
                                        {

                                            this.state.DonarRequestor && this.state.DonarRequestor.length > 0 && this.state.DonarRequestor.map((donar, key) => {
                                                return (
                                                    <div key={key} className={styles.textStyles + "  ms-Grid-row  "}>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.Name}</div>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.Requestor}</div>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.CreatedOn.toLocaleDateString()}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className=" ms-Grid-col ms-sm6 ">
                                    <div className={styles.gridHeight}>
                                        <div className={styles.tileHeader}>Frequently Donated Members</div>
                                        <div className={styles.textStyles + "  ms-Grid-row  "}>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm4 "}>Name</div>
                                            <div className={styles.columnsHeader + " ms-Grid-col ms-sm8 "}>Number of Times Donated</div>

                                        </div>
                                        {
                                            this.state.frequentDonars && this.state.frequentDonars.length > 0 && this.state.frequentDonars.map((donar, key) => {
                                                return (
                                                    <div key={key} className={styles.textStyles + "  ms-Grid-row  "}>
                                                        <div className=" ms-Grid-col ms-sm4 ">{donar.Name}</div>
                                                        <div className=" ms-Grid-col ms-sm8 ">{donar.Count}</div>

                                                    </div>
                                                )
                                            })
                                        }
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