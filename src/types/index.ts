import { store } from "reduxFolder/store";
import { Dispatch, RefObject, SetStateAction } from "react";

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface EventType {
    id: string | number;
    project: {
        id: string | number;
        responsible_person: {
            id: string | number;
            name: string;
            email: string;
            phone: string;
            image: string;
        };
        name: string;
        description: string;
        project_status: string;
        step_status: string;
        revenue: string;
        expenditures: string;
        paid: number;
        to_paid: number;
        created_at: string;
        finished_at: string;
        customer: number;
    };
    employees: {
        id: string | number;
        name: string;
        email: string;
        phone: string;
        image: string;
    }[];
    suppliers:
        | null
        | {
              id: string | number;
              name: string;
              image: string;
          }[];
    name: string;
    total_time: number;
    end_date: string;
    start_date: string;
    description: string;
    project_id?: string | number;
    supplier_id?: string | number;
    employee_id?: string | number;
    informEmployee?: boolean;
    informSuppliers?: boolean;
}

export interface EventOverviewType {
    id: string | number;
    project: {
        id: string | number;
        name: string;
        project_status: string;
        responsible_person: {
            id: string | number;
            name: string;
            email: string;
            phone: string;
            image: string;
        };
    };
    employees: {
        id: string | number;
        name: string;
        email: string;
        phone: string;
        image: string;
    }[];
    suppliers:
        | null
        | {
              id: string | number;
              name: string;
              image: string;
          }[];
    name: string;
    total_time: number;
}

export interface TableListProps {
    names: (
        | string
        | {
              name: string;
              options?: { name: string | number; value: string | number }[];
              keyName?: string;
              setOption?: (arg: any) => void;
              search?: boolean;
              setSearch?: (arg: any) => void;
              sort?: { name: string; value: string }[];
              setSort?: (arg: any) => void;
              placeholder?: string;
          }
    )[];
    order: string[];
    listType: string;
    data: { [key: string]: any }[];
    width: number[];
}

export interface ListCellProps {
    name:
        | string
        | number
        | {
              name: string | boolean;
              onChange: (arg: any) => void;
              options?: {
                  name: string | number;
                  value: string | number;
                  checked?: boolean;
              }[];
              image?: string;
              disabled?: boolean;
          }
        | {
              name: string | boolean;
              onHover: (arg: any) => void;
              options?: { name: string | number; value: string | number }[];
              image?: string;
              disabled?: boolean;
          }[];
    width: number;
    cellType: string;
    tableName?: string;
}

export interface ListTitleCellProps {
    name:
        | {
              name: string;
              keyName?: string;
              options?: { name: string | number; value: string | number }[];
              filterTerm?: FilterTermType;
              setOption?: (arg: any) => void;
              searchTerm?: SearchTermType;
              search?: boolean;
              setSearch?: (arg: any) => void;
              sort?: { name: string; value: string }[];
              setSort?: (arg: any) => void;
              sortTerm?: SortTermType;
              placeholder?: string;
          }
        | string;
    width: number;
}

export interface EmployeeCardProps {
    name: string;
    role: string;
    phone: string;
    email: string;
    wage: number;
    jobType: "hauptberuflich" | "ehrenamtlich";
    id: string | number;
    image: string;
}

export interface TableSwitcherProps {
    values: {
        name: string;
        value: string;
    }[];
    onChange: (arg: string) => void;
    currentValue: string;
    activeColor: string;
    activeBGColor: string;
}

export interface ModalWindowProps {
    title?: string;
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    height?: string;
    ref?: RefObject<HTMLDivElement>;
}

export interface ImgUploadProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    src: string;
    size: number;
}

export interface FormProps {
    closeModal: () => void;
}

export interface ClientType {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    address: string;
    type: string;
    role: string;
    projects: {
        name: string;
        id: string;
        status: ListItemStatus;
        step: string;
    }[];
}

export interface BackEndClientType {
    id?: string | number;
    projects?:
        | {
              id?: string | number;
              name: string;
              project_status: string;
              step_status: number;
          }[]
        | null;
    name: string;
    email: string;
    phone: string;
    image?: string | null;
    address: string;
    type: string;
    role: string;
}

export interface ProjectType {
    name: string;
    status: ListItemStatus;
    respPerson: {
        name: string;
        image: string;
    };
    timeline: string;
    phoneNumber: string;
    id: string;
    description: string;
    stepStatus: string;
    paid: number;
    toPaid: number;
    createdAt: string;
    finished_at: string;
    customer: number;
    finish_notes: string | null;
}

export interface BackEndProjectType {
    id?: string | number;
    name: string;
    description: string;
    project_status: string;
    step_status: number;
    paid: number;
    to_paid: number;
    created_at: string;
    finished_at: string;
    responsible_person: {
        email: string;
        id: string | number;
        image: string | null;
        name: string;
        phone: string;
    };
    customer: number;
    customer_id?: string | number;
    responsible_person_id?: string | number;
    finish_notes: string | null;
}

export interface CreatingProjectType {
    name: string;
    customer_id: string | number;
    responsible_person_id?: string | number;
}

export interface BackEndProjectDetails extends BackEndProjectType {
    positions: PropositionType[];
    documents: {
        id: number | string;
        document: string;
    }[];
}

export interface ProjectDetails extends ProjectType {
    propositions: PropositionType[];
    documents: {
        id: number | string;
        document: string;
        name:
            | "Lageplan"
            | "Stringplan"
            | "Montageplan"
            | "Measurement_protocol"
            | "Acceptance_protocol";
        additional_invoice_for_project?: boolean;
        type:
            | "proposition_to_sent"
            | "proposition_confirmed"
            | "First_invoice"
            | "Second_invoice"
            | "Third_invoice"
            | "additional_invoice"
            | "invoice_without_project";
    }[];
    expenditures: number;
    revenue: number;
}

export interface PropositionType {
    id: string | number;
    positions: PositionType[];
    name: string;
    client_id: number | string;
    description: string;
    title: string;
    created_at: string;
    project: number | string | null;
    confirmed_by_client: boolean;
    network_requested: boolean;
    client: string | number;
}

export interface CreatePropositionType {
    name: string;
    description?: string;
    project_id?: number | string | null;
    additional_invoice_for_project?: boolean;
}

export interface PositionType {
    id: number;
    position_items: PositionItemType[];
    title: string;
    proposition: number | string;
}

export interface PositionItemType {
    id?: string | number;
    material: {
        id: string | number;
        article_number: string;
        supplier: {
            id: number | string;
            name: string;
            address: string;
        };
        available_count: number;
        reserved_count: number;
        ordered_count: number;
        units: string;
        name: string;
        when: string;
    };
    name: string | null;
    buying_price: string | null;
    client_price: string | null;
    amount?: number | null;
    vat?: number | null;
    total?: string | null;
    units: string | null;
    paid: boolean;
    when: string;
    network_requested: boolean;
    received: boolean;
    reserved: boolean;
    position: string;
    ordered: number;
}

export interface SupplierType {
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    wage: number | string;
    role: string;
    UstId: string;
    bankDetails: string;
    address: string;
    id: string | number;
    image: string;
    type: "Materials" | "Workers";
}

export interface BackEndSupplierType {
    Ust_id: string;
    address: string;
    bank_details: string;
    company: string;
    email: string;
    hourly_wage: number;
    id?: number | string;
    image?: string;
    name: string;
    phone: string;
    role: string;
    type: "Materials" | "Workers";
}

export interface EmployeeType {
    name: string;
    email: string;
    wage: number;
    phone: string;
    role: string;
    jobType: "hauptberuflich" | "ehrenamtlich";
    id: string | number;
    image: string;
}

export interface BackEndEmployeeType {
    id?: string | number;
    name: string;
    email: string;
    phone: string;
    role: string;
    image?: string;
    hourly_wage: number;
    job_type: "hauptberuflich" | "ehrenamtlich";
    password?: string;
}

export type InventoryType = {
    id: string;
    name: string;
    description: string;
    article: string;
    supplier: string;
    address: string;
    available: number;
    reserved: number;
    ordered: number;
    units: Units;
    supplierId: string | number | undefined;
    is_active: boolean;
    photo: string;
};
export type BackEndInventoryType = {
    article_number: string;
    available_count: number;
    description: string;
    id?: string | number;
    name: string;
    ordered_count: number | null;
    reserved_count: number;
    is_active: boolean;
    supplier_id:
        | null
        | {
              id: string | number;
              address: string;
              name: string;
          }
        | number
        | string;
    supplier?:
        | null
        | {
              id: string | number;
              address: string;
              name: string;
          }
        | number
        | string;
    units: BackendUnits;
    photo?: string;
};

export interface InternalExpenseType {
    id: string | number;
    category: "material" | "equipment" | "transport" | "other";
    description: string;
    amount: string;
    date: string;
    project: {
        id: string | number;
        name: string | number;
    };
    pdf?: string;
    project_id?: string | number;
}

export interface LaborType {
    id: string | number;
    name: string;
    date: string;
    hours: number;
    amount: string;
    project: number | string;
    employee: {
        id: string | number;
        name: string;
    } | null;
    supplier: {
        id: string | number;
        name: string;
    } | null;
    supplier_id?: string | number;
    project_id?: string | number;
}

export interface workersEmployeeStatisticItemType {
    emp_id: string | number;
    image: string;
    employee_name: string;
    project_cout: number;
    hours_count: number;
}
export interface workersSuppliersStatisticItemType {
    supplier_id: number;
    supplier_name: string;
    worker_name: string;
    hours_count: number;
}

export interface StatisticsType {
    [key: string]: {
        [key: string]: {
            [key: string]: {
                revenue: number;
                expenditures: number;
                profit: number;
            };
        }[];
    }[];
}

export interface InvoiceType {
    id: string | number;
    document: string;
    name: string;
    proposition?: {
        id: string | number;
        revenue: number | string;
        created_at: string;
        client: {
            id: string | number;
            name: string;
        };
    };
    project?: null | string | number;
    revenue: number | string;
}

export type LoadingStatusType = "idle" | "loading" | "error";
export type ListItemStatus = "In progress" | "Planned" | "Completed";

export type Units =
    | "meter"
    | "kilogram"
    | "liter"
    | "gram"
    | "centimeter"
    | "Stück"
    | "kWp"
    | "Pauschal"
    | "Stunden";
export type BackendUnits =
    | "l"
    | "kg"
    | "g"
    | "cm"
    | "m"
    | "stück"
    | "kWp"
    | "pauschal"
    | "stunden";

export type SearchTermType = {
    [key: string]: any;
} | null;
export type FilterTermType = {
    [key: string]: any;
} | null;
export type SortTermType = {
    [key: string]: "inc" | "dec";
};

export interface InvoiceFormInputs {
    name: string;
    customer: string | number;
    options: {
        positions: ParentInvoiceFormPositionObject[];
        notes: string;
        title: string;
        price: string;
        vat: string;
        totalAmount: string;
    };
}

export interface ParentInvoiceFormPositionObject {
    position: string | null;
    position_items: Partial<PositionItemType>[];
}

export interface PosItemChangeMaterialType {
    position_item_id: number | string;
    available_count?: number;
    reserved_count?: number;
    ordered_count?: number;
    add_ordered_for_item: boolean;
}

export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface EventFormInputs {
    name: string;
    project: string | null;
    employees: {
        id: string | number | null;
    }[];
    description: string;
    startDate: string;
    endDate: string;
    suppliers: {
        id: string | number | null;
    }[];
    informEmployee: boolean;
    informSuppliers: boolean;
}

export interface ProjectChat {
    id: number;
    insideProject: boolean;
    project: {
        id: number;
        name: string;
    };
    messages: MessageStructure[];
    created_at: string;
    employees: number[];
    closeChatHandler?: (arg: boolean) => void;
}

export interface MessageStructure {
    id: number;
    by_employee: {
        id: number;
        name: string;
        image: string;
    };
    created_at: string;
    message: string;
    message_reply: Partial<MessageStructure> | null;
    setReplyingMessage?: Dispatch<
        SetStateAction<{
            name: string;
            message: string;
            created_at: string;
            id: number;
        } | null>
    >;
    lastMessageRef?: RefObject<HTMLDivElement>;
    from_user?: number;
    chat_id?: number;
}

export interface InboxChat {
    id: number;
    employee_1: {
        id: number;
        name: string;
        image: string;
    };
    employee_2: {
        id: number;
        name: string;
        image: string;
    };
    messages: {
        id: number;
        message: string;
        created_at: string;
        revised: boolean;
        chat: number;
        from_user: number;
        to_user: number;
        message_reply: Partial<MessageStructure>;
    }[];
    created_at: string;
    unread_messages: number;
    last_message: string;
}
