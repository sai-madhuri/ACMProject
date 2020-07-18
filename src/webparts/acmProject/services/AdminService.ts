import { sp, ChoiceFieldFormatType, DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType, FieldUserSelectionMode } from "@pnp/sp/presets/all";

export class Application {
    ID: number;
    Name: string;
    Logo: any;
    Description: string;
    DonorFields: Array<Field>;
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
    PeoplePicker = "PeoplePicker",
    Number = "Number",
    DateTime = "DateTime"
}

export const createList = async (application: Application) => {
    const listEnsureResult = await sp.web.lists.ensure(application.Name, application.Description, 100);
    if (listEnsureResult.created) {
        await sp.web.lists.getByTitle("CampaignList").items.add({
            Title: application.Name,
            CampaignDescription: application.Description
        }).then(result => {
            result.item.attachmentFiles.addMultiple(application.Logo).then(item => {
                return result;
            })
        })

        application.DonorFields.forEach(field => {
            if (field.type != "Dropdown") {
                addFieldToList(application.Name, field);
            }
            else {
                addFieldToList(application.Name, field,);
            }
        })

        application.RequestorFields.forEach(field => {
            if (field.type != "Dropdown") {
                addFieldToList(application.Name, field);
            }
            else {
                addFieldToList(application.Name, field,);
            }
        })
    } else {
        console.log("List already exists!");
    }
}

export const addFieldToList = async (listName, field: Field, choices?: Array<string>) => {
    let group = listName + "Group"
    switch (field.type) {
        case 'Textbox': await sp.web.lists.getByTitle(listName).fields.addText(field.typevalues, 255, { Group: group });
            break;

        case 'Dropdown': await sp.web.lists.getByTitle(listName).fields.
            addChoice(field.typevalues, choices, ChoiceFieldFormatType.Dropdown, false, { Group: group });
            break;

        case 'Number': await sp.web.lists.getByTitle(listName).fields.addNumber(field.typevalues, 0, Number.MAX_VALUE, { Group: group });
            break;

        case 'DateTime': sp.web.lists.getByTitle(listName).fields
            .addDateTime(field.typevalues, DateTimeFieldFormatType.DateOnly, CalendarType.Gregorian, DateTimeFieldFriendlyFormatType.Disabled, { Group: group });
            break;

        case 'TextArea': sp.web.lists.getByTitle(listName).fields.addMultilineText(field.typevalues, 10, false, false, false, true, { Group: group });
            break;

        case 'PeoplePicker': sp.web.lists.getByTitle(listName).fields.addUser(field.typevalues, FieldUserSelectionMode.PeopleAndGroups, { Group: group })
            break;

        case 'Radio': sp.web.lists.getByTitle(listName).fields.addBoolean(field.typevalues, { Group: group });
            break;
    }
}