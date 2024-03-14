import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faMessage, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


type TScreenName = "Home" | "Wishlists" | "Trips" | "Inbox" | "Profile"



export class ScreenManager{
    declare screenName: TScreenName;
    declare navIcon: IconDefinition;
    declare icons: IconDefinition[];
    constructor(screenName: TScreenName, navIcon: IconDefinition){
        this.screenName = screenName;
        this.navIcon = navIcon;
        this.icons = [
            faHeart,
            faCircleUser,
            faMessage,
            faMagnifyingGlass
        ]
    }

    setScreen(newScreenName:TScreenName): void{
        this.screenName = newScreenName
    }

    getScreen():TScreenName {
        return this.screenName;
    }

    setIcon(newIcon: IconDefinition):void {
        this.navIcon = newIcon;
    }

    getIcon():IconDefinition{
        return this.navIcon;
    }
}
