export class Appliacation {
    ID: number;
    Name: string;
    Logo:Array<any>;
    Description: string;
    DonarFeilds: Array<Field>;
    RequestorFields: Array<Field>;


}
export class Field {
    Name: string;
    type: FieldType;
    typevalues: string;
}
export enum FieldType {
    Dropdown = "Dropdown",
    Textbox = "Textbox",
    Radio = "Radio",
    TextArea = "TextArea",
    PeoplePicker = "PeoplePicker"
}

export enum EnumField{
    Name="Name",
    type="type",
    typevalues="typevalues"
}

export enum FormType{
    Requestor="Requestor",
    Donar="Donar",
    Name="Name",
    Description="Description"

}