import * as React from 'react';
import styles from './AdminComponent.module.scss';
import { Appliacation, Field, FieldType, FormType, EnumField } from '../../../Models/Campaign'
import { Icon, Label, TextField, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { CommandBarButton, IContextualMenuProps, IIconProps, Stack, IStackStyles, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';

export interface IAdminComponentProps {

}

export interface IAdminComponentState {
    appliacation: Appliacation
}



export default class AdminComponent extends React.Component<IAdminComponentProps, IAdminComponentState> {
    dropdownValues: IDropdownOption[] = [];
    addIcon: IIconProps = { iconName: 'Add' };
    file: Array<any> = [];
    constructor(props: IAdminComponentProps) {
        super(props);
        var appliacation = new Appliacation();

        var field1 = new Field();
        field1.Name = "Name"
        field1.type = FieldType.Textbox;

        var field2 = new Field();
        field2.Name = "Mobile Number"
        field2.type = FieldType.Textbox;

        var field3 = new Field();
        field3.Name = "Donars"
        field3.type = FieldType.PeoplePicker;

        appliacation.RequestorFields = [];
        appliacation.RequestorFields.push(field1);
        appliacation.RequestorFields.push(field2)
        appliacation.RequestorFields.push(field3)

        var donfield1 = new Field();
        donfield1.Name = "Name"
        donfield1.type = FieldType.Textbox;

        var donfield2 = new Field();
        donfield2.Name = "Mobile Number"
        donfield2.type = FieldType.Textbox;

        appliacation.DonarFeilds = [];
        appliacation.DonarFeilds.push(donfield1);
        appliacation.DonarFeilds.push(donfield2);

        appliacation.Logo=[];

        for (let value in FieldType) {
            this.dropdownValues.push({ key: value, text: value })
        }
        this.state = {
            appliacation: appliacation,
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.checkFileType = this.checkFileType.bind(this);
        this.saveCampaign = this.saveCampaign.bind(this);
        this.cancelCampaigns = this.cancelCampaigns.bind(this);
    }

    onAdd(type: string) {
        var application = this.state.appliacation;
        var requestorFields = this.state.appliacation.RequestorFields;
        var DonarsFields = this.state.appliacation.DonarFeilds;
        if (type == FormType.Requestor) {
            var field: Field = new Field();
            field.type = FieldType.Textbox;
            field.Name = "";
            field.typevalues = "";
            requestorFields.push(field);
        }

        else {

            var donarfield: Field = new Field();
            donarfield.type = FieldType.Textbox;
            donarfield.Name = "";
            donarfield.typevalues = "";
            DonarsFields.push(donarfield);
        }
        application.RequestorFields = requestorFields;
        application.DonarFeilds = DonarsFields;
        this.setState({ appliacation: application })
    }

    onDelete(type: string, key: number) {
        var application = this.state.appliacation;
        var requestorFields = this.state.appliacation.RequestorFields;
        var DonarsFields = this.state.appliacation.DonarFeilds;
        if (type == FormType.Requestor)
            requestorFields.splice(key, 1)
        else {
            DonarsFields.splice(key, 1)
        }
        application.RequestorFields = requestorFields;
        application.DonarFeilds = DonarsFields;
        this.setState({ appliacation: application })
    }

    onChangeValue(key: number, fieldName: string, event: any, type: string) {

        var application = this.state.appliacation;
        var requestorFields = this.state.appliacation.RequestorFields;
        var DonarsFields = this.state.appliacation.DonarFeilds;
        if (type == FormType.Name) {
            application.Name=event.target.value
        }
        if (type == FormType.Description) {
            application.Description=event.target.value
        }

        else if (type == FormType.Requestor) {
            var requestor = requestorFields[key];
            if (fieldName == EnumField.Name) {
                requestor.Name = event.target.value
            }
            else if (fieldName == EnumField.type) {
                requestor.type = event.key
            }
            else if (fieldName == EnumField.typevalues) {
                requestor.typevalues = event.target.value
            }
            requestorFields[key] = requestor;
        }

        else {
            var donar = DonarsFields[key];
            if (fieldName == EnumField.Name) {
                donar.Name = event.target.value
            }
            else if (fieldName == EnumField.type) {
                donar.type = event.key
            }
            else if (fieldName == EnumField.typevalues) {
                donar.typevalues = event.target.value
            }
            DonarsFields[key] = donar
        }
        application.RequestorFields = requestorFields;
        application.DonarFeilds = DonarsFields;
        this.setState({ appliacation: { ...application } })
    }

    checkFileType(files: FileList) {
        this.file = [];

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var fileType = files[i].name.replace(/^.*\./, '').toLowerCase();
                if (fileType == "jpg" || fileType == "png") {
                    this.file.push(files[i]);
                }
            }

        }
        else {
            if (this.file.length <= 0)
                this.file = [];
        }
     var application={... this.state.appliacation};
     application.Logo=this.file
        this.setState({
            appliacation:application

        });


        var fileUploader: any = document.getElementById('fileuploader');
        //  (fileUploader != null && fileUploader != undefined && fileUploader != '') ? fileUploader.value = null : '';
    }

    saveCampaign() {
        console.log(this.state.appliacation)
    }
    cancelCampaigns() {

    }

    public render(): React.ReactElement<any> {

        return (
            <div className={styles.acmProject}>
                <div className={styles.container}>
                    <div className={styles.header + "  ms-Grid-row "}>
                        <span>New Campaign </span>
                    </div>
                    <div className={styles.bodyContainer}>
                        <div className={styles.fieldMargin + " ms-Grid-row "}>
                            <div className={styles.Requestors + " ms-Grid-col  ms-sm3"}>Name :</div>
                            <div className="ms-Grid-col ms-sm5"> <TextField className={styles.borderRadius} value={this.state.appliacation.Name} required  onChange={(e) => this.onChangeValue(0, '', e, FormType.Name)} /></div>
                        </div>
                        <div className={styles.fieldMargin + " ms-Grid-row "}>
                            <div className={styles.Requestors + " ms-Grid-col  ms-sm3"}>Description :</div>
                            <div className="ms-Grid-col ms-sm5"> <TextField className={styles.borderRadius} multiline rows={3} value={this.state.appliacation.Description} onChange={(e) => this.onChangeValue(0, '', e, FormType.Description)} required /></div>
                        </div>
                        <div className={styles.fieldMargin + " ms-Grid-row "}>

                            <div className={styles.Requestors + " ms-Grid-col  ms-sm3"}>Logo :</div>
                            <div className="ms-Grid-col ms-sm5">
                                {
                                    this.state.appliacation&&  this.state.appliacation.Logo&&  this.state.appliacation.Logo.length > 0 ? (<Image src={URL.createObjectURL( this.state.appliacation.Logo[0])} />) : <div>  <input id="fileuploader" type="file" onChange={e => this.checkFileType(e.target.files)} className="d-none" /></div>

                                }
                            </div>


                        </div>


                        <div >
                            <div>
                                <span className={styles.Requestors}>Donar Template :</span>
                            </div>

                            {
                                this.state && this.state.appliacation && this.state.appliacation.DonarFeilds && this.state.appliacation.DonarFeilds.map((field, key) => {
                                    var disbaledropdown = key < 2 || field.type == FieldType.Textbox || field.type == FieldType.TextArea || field.type == FieldType.PeoplePicker;
                                    return (
                                        <div key={key}>
                                            <div className={styles.rowMargin + " ms-Grid-row "}>
                                                <div className="ms-Grid-col ms-sm3"> <TextField value={field.Name} disabled={key < 2} onChange={(e) => this.onChangeValue(key, EnumField.Name, e, FormType.Donar)} /></div>
                                                <div className="ms-Grid-col  ms-sm3">
                                                    <Dropdown
                                                        defaultSelectedKey={field.type}
                                                        selectedKey={field.type}
                                                        disabled={key < 2}
                                                        options={this.dropdownValues}
                                                        onChanged={(e) => this.onChangeValue(key, EnumField.type, e, FormType.Donar)}
                                                    />
                                                </div>
                                                <div className="ms-Grid-col  ms-sm4"> <TextField disabled={disbaledropdown} onChange={(e) => this.onChangeValue(key, EnumField.typevalues, e, FormType.Donar)} /></div>
                                                {
                                                    key > 1 ?
                                                        <div className={styles.deleteIcon + " ms-Grid-col  ms-sm1"}><Icon iconName="Delete" onClick={() => this.onDelete(FormType.Donar, key)} /> </div>
                                                        : <div></div>
                                                }
                                            </div>

                                        </div>


                                    )
                                })



                            }
                            <div className={styles.rowMargin + " ms-Grid-row " + styles.alignment}>
                                <PrimaryButton text="Add More Fields" allowDisabledFocus iconProps={this.addIcon} onClick={() => this.onAdd(FormType.Donar)} />
                            </div>
                        </div>

                        <div >
                            <div >
                                <span className={styles.Requestors}>Requestor Template :</span>
                            </div>

                            {
                                this.state && this.state.appliacation && this.state.appliacation.RequestorFields && this.state.appliacation.RequestorFields.map((field, key) => {

                                    return (
                                        <div key={key}>
                                            <div className={styles.rowMargin + " ms-Grid-row "}>
                                                <div className="ms-Grid-col ms-sm3"> <TextField value={field.Name} disabled={key < 3} onChange={(e) => this.onChangeValue(key, EnumField.Name, e, FormType.Requestor)} /></div>
                                                <div className="ms-Grid-col  ms-sm3">
                                                    <Dropdown
                                                        defaultSelectedKey={field.type}
                                                        selectedKey={field.type}
                                                        disabled={key < 3}
                                                        options={this.dropdownValues}
                                                        onChanged={(e) => this.onChangeValue(key, EnumField.type, e, FormType.Requestor)}
                                                    />
                                                </div>
                                                <div className="ms-Grid-col  ms-sm4"> <TextField disabled={key < 3 || field.type == FieldType.Textbox || field.type == FieldType.TextArea || field.type == FieldType.PeoplePicker} value={field.typevalues} onChange={(e) => this.onChangeValue(key, EnumField.typevalues, e, FormType.Requestor)} /></div>
                                                {
                                                    key > 2 ?
                                                        <div className={styles.deleteIcon + " ms-Grid-col  ms-sm1"}><Icon iconName="Delete" onClick={() => this.onDelete(FormType.Requestor, key)} /> </div>
                                                        :
                                                        <div></div>
                                                }
                                            </div>

                                        </div>


                                    )
                                })



                            }
                            <div className={styles.rowMargin + " ms-Grid-row " + styles.alignment}>
                                <PrimaryButton text="Add More Fields" allowDisabledFocus iconProps={this.addIcon} onClick={() => this.onAdd(FormType.Requestor)} />
                            </div>
                        </div>


                        <div className={styles.btnAlignment + " ms-Grid-row "}>
                            <DefaultButton text="Save" className={styles.saveBtn} onClick={this.saveCampaign} />
                            <DefaultButton text="Cancel" className="" onClick={this.cancelCampaigns} />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


