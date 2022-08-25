import { CookiesX } from "../dom/Cookies.js";

export class AppCurrentUser {
    static _username = "";
    static get username() { return AppCurrentUser._username; }

    static _userRoles = "";
    static get userRoles() { return AppCurrentUser._userRoles; }

    //=========================================================================
    private static userHasRole(role: string) {
        if (!this.userRoles) {
            throw Error("userRoles not set");
        }
        if (!role) {
            throw Error("Invalid arg: " + role);
        }
        return this.userRoles.includes(role);
    }

    //=========================================================================AppCurrentUser
    private static get _hasRoleSuperuserPure() { return this.userHasRole("superuser"); }
    static get hasRoleSuperuser() {
        let ret = this.userHasRole("superuser");
        if (location.href.includes('zzadminonly') ||
            location.href.includes('zzreadonly')) {
            ret = false;
        }
        return ret;
    }
    static get _hasRoleAdminOrHigherPure() { return this.userHasRole("admin") || this._hasRoleSuperuserPure; }
    static get hasRoleAdminOrHigher() {
        let ret = this.userHasRole("admin") || this._hasRoleSuperuserPure;
        if (this._hasRoleSuperuserPure && location.href.includes('zzadminonly')) {
            ret = true;
        }
        else if (location.href.includes('zzreadonly')) {
            ret = false;
        }
        return ret;
    }
    static get hasRoleAdminOnly() { //and not superuser
        let ret = this.userHasRole("admin") && !this._hasRoleSuperuserPure;
        if (this._hasRoleSuperuserPure && location.href.includes('zzadminonly')) {
            ret = true;
        }
        else if (location.href.includes('zzreadonly')) {
            ret = false;
        }
        return ret;
    }

    static get hasRoleReadOrHigher() {
        let ret = this.userHasRole("readonly") || this._hasRoleAdminOrHigherPure;
        if (this._hasRoleAdminOrHigherPure && location.href.includes('zzreadonly')) {
            ret = true;
        }
        return ret;
    }
    static get hasRoleReadOnly() { //and not admin or superuser
        let ret = this.userHasRole("readonly") && !this._hasRoleAdminOrHigherPure;
        if (this._hasRoleAdminOrHigherPure && location.href.includes('zzreadonly')) {
            ret = true;
        }
        return ret;
    }
    //=========================================================================
    static get anonymousUserID(): string {
        {
            let key = "auid";
            let ret = CookiesX.getValue(key);
            if (ret === null) {
                ret = "";
                CookiesX.setValue(key, ret, Infinity);
            }
            return ret;
        }
    }
}
