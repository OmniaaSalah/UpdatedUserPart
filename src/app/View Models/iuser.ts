export interface Iuser {
    
    name: string;
    email: string;
    mobileNo: string[];
    address: {
      street: string;
      city:string;
      postalCode: string;
    };
    password: string;
    reachedBy: string;
    reachedByOther?:string;
}

  