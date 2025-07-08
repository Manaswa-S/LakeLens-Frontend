

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


export type LakeDetails = {
    CreatedAt: string;
    LakeID: number;
    Name: string;
    Ptype: string;
    Region: string;
};
export type LocDetails = { BucketName: string; CreatedAt: string; LakeID: number; LocID: number };




export type LocChecks = {
    LocID: number;
    BucketName: string;
    AuthCheck: boolean;
    PolicyCheck: boolean;
    ReadCheck: boolean;
    WriteCheck: boolean;
}

type SchemaField = {
    ID: Number;
    Name: string;
    Required: boolean;
    Type: string | object;
    Doc: string;
}

// The schema of an iceberg table.
export type Schema = {
    SchemaID: Number;
    Fields: SchemaField[];
};