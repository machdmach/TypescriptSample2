import { Randomizer } from "./Randomizer.js";
//=========================================================================
export class EntityBase {
}
export class ChildEntityBase extends EntityBase {
}
//=========================================================================
export class EntityManagerBase {
    static fillSampleData(e) {
        //e.KeyID = -3852;
        //e.Parent = null;
        // e.InternalAdminNotes = "Testing only; please ignore this record";
        // e.CreatedOn = new Date();
        // e.CreatedBy = "user1c";
        // e.UpdatedOn = new Date();
        // e.UpdatedBy = "user1u";
        // e.RecordVersion = 99;
        // e.RecordStatus = 99;
        // e.DisplayOrder = 99;
        e.InternalAdminNotes = "Testing only, please ignore+ " + Randomizer.generateInteger(1, 10000);
        return e;
    }
    //=========================================================================
    static isCanceled(ent) {
        var _a;
        return ((_a = ent.RecordStatus) === null || _a === void 0 ? void 0 : _a.localeCompare("Canceled", undefined, { sensitivity: 'base' })) === 0;
    }
    //=========================================================================
    static getAuditInfo(ent) {
        if (Object(ent) !== ent) {
            //boxing of string is different from the primitive string
            if (typeof ent === "string") {
                //doing nothing, server returning preformated html
                return "No auditInfo available, record is a string";
            }
            else {
                throw Error("getAuditInfo, arg.ent must not be a primitive: " + typeof (ent));
            }
        }
        let ret = "";
        if (ent.CreatedOn) {
            let dt = ent.CreatedOn;
            let createdBy = (ent.CreatedBy + "") === "1" ? "web" : ent.CreatedBy;
            try {
                ret += `Added by: ${createdBy} on <time datetime='${dt.toISOString()}'>${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}</time>`;
            }
            catch (err) {
                ret += err + ', CreatedOn=' + ent.CreatedOn + ", type=" + typeof (dt);
            }
        }
        else {
            ret += "CreateOn is null";
        }
        if (ent.UpdatedOn) {
            let dt = ent.UpdatedOn;
            if (!(dt instanceof Date)) {
                let err = dt + ", UpdatedOn is not Date type: " + typeof dt;
                throw Error(err);
            }
            let updateCancelByLabel = "Updated by";
            if (ent.RecordStatus && ent.RecordStatus.toString() !== "1") {
                updateCancelByLabel = `${ent.RecordStatus} by`;
            }
            ret += `<br>${updateCancelByLabel}: ${ent.UpdatedBy} on <time datetime='${dt.toISOString()}'>${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}</time>`;
        }
        ret += `<br> RecordID: <span id='recordIDVersion'> ${ent.KeyID}v${ent.RecordVersion} </span>`;
        return ret;
    }
}
