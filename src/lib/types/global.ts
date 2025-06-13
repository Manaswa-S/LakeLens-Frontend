export type Settings = {
    // Preferences
    AdvancedMetaData: boolean
    CompactView: boolean
    AutoRefreshInterval: Number
    Notifications: boolean
    // UI/UX
    Theme: string
    FontSize: number
    ShowToolTips: boolean
    // Usage
    KeyboardShortcuts: boolean
};


export type NewProject = {
    Name: string

    S3: AWSS3Creds
    Azure: AzureCreds
};

export type AWSS3Creds = {
    AccessID: string
    AccessKey: string
    Region: string
};

export type AzureCreds = {
    AccessID: string
    AccessKey: string
    Region: string
};


export type SearchChoice = {
    Label: string
    Link: string
};
