import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "hooks/useHttp";
import { baseUrl } from "services/API";
import { LoadingStatusType } from "types/index";

const initialState: {
  propositionDocument: {
    "id": string | number,
    "document": string,
    "name": "Proposition_to_sent" | "Proposition_confirmed",
    "proposition": number | string,
    "project": string | number
  } | null;
  invoices: {
    "id": string | number,
    "url": string,
    "name": string,
  }[],
  additionalInvoice: {
    id: string | number;
    name: string
    document: string
  } | null
  generateInvoicesLoadingStatus: LoadingStatusType
  generateAdditionalInvoiceLoadingStatus: LoadingStatusType
  generateInvoiceWithoutProjectLoadingStatus: LoadingStatusType
  generatePropositionDocumentLoadingStatus: LoadingStatusType,
  generateConfirmedPropositionDocumentLoadingStatus: LoadingStatusType,
  deleteDocumentLoadingStatus: LoadingStatusType,
  invoiceGeneratingLoadingStatus: LoadingStatusType,
  isAdditionalInvoiceSubmitted: boolean,
} = {
  propositionDocument: null,
  additionalInvoice: null,
  invoices: [],
  generateInvoicesLoadingStatus: "idle",
  generateAdditionalInvoiceLoadingStatus: "idle",
  generateInvoiceWithoutProjectLoadingStatus: "idle",
  generatePropositionDocumentLoadingStatus: 'idle',
  generateConfirmedPropositionDocumentLoadingStatus: "idle",
  deleteDocumentLoadingStatus: "idle",
  invoiceGeneratingLoadingStatus: "idle",
  isAdditionalInvoiceSubmitted: false
}

export const generateUnconfirmedPropositionDocument = createAsyncThunk(
  "documents/generateUnconfirmedPropositionDocument",
  async (payload: {
    projectId: string | number
  }) => {
    const { request } = useHttp();
    const res = await request(`${baseUrl}/api/v1/generate_invoices/proposition-to-sent/${payload.projectId}/false/`, "GET", null, {
      "accept": "application/json"
    });
    return res
  }
)
export const updateUnconfirmedPropositionDocument = createAsyncThunk(
  "documents/updateUnconfirmedPropositionDocument",
  async (payload: {
    projectId: string | number,
    docId: string | number
  }) => {
    const { request } = useHttp();
    // await request(`${baseUrl}/api/v1/documents/${payload.docId}/`, 'DELETE');
    const res = await request(`${baseUrl}/api/v1/generate_invoices/proposition-to-sent/${payload.projectId}/false/`, "GET", null, {
      "accept": "application/json"
    });
    res.prevId = payload.docId
    return res
  }
)
export const generateConfirmedPropositionDocument = createAsyncThunk(
  "documents/generateConfirmedPropositionDocument",
  async (payload: {
    projectId: string | number,
    unconfirmedPropId?: string | number
  }) => {
    const { request } = useHttp();
    const res = await request(`${baseUrl}/api/v1/generate_invoices/proposition-to-sent/${payload.projectId}/true/`, "GET", null, {
      "accept": "application/json"
    });
    if (payload.unconfirmedPropId) {
      await request(`${baseUrl}/api/v1/documents/${payload.unconfirmedPropId}/`, 'DELETE');
      res.unconfirmedPropId = payload.unconfirmedPropId
    }

    return res
  }
)



export const generateIvoices = createAsyncThunk(
  "documents/generateInvoices",
  async ({ projectId, invoice_type }: {
    projectId: string | number,
    invoice_type: "First" | "Second" | "Third",
  }) => {
    const { request } = useHttp();
    const res = await request(`${baseUrl}/api/v1/generate_invoices/for-project/${projectId}/${invoice_type}/`, "GET", null, {
      "accept": "application/json"
    });
    return res
  }
)

export const generateInvoicesWithoutProject = createAsyncThunk(
  "documents/generateInvoicesWithoutProject",
  async ({ proposition_id }: {
    proposition_id: string | number,
  }) => {
    const { request } = useHttp();
    const token = localStorage.getItem("access");
    const res = await request(`${baseUrl}/api/v1/generate_invoices/without-project/${proposition_id}/`, "GET", null, {
      "accept": "application/json",
      Authorization: `Bearer ${token}`
    });
    return res
  }
)
export const generateAdditionalInvoice = createAsyncThunk(
  "documents/generateAdditionalInvoice",
  async ({ proposition_id, project_id }: {
    proposition_id: string | number,
    project_id: string | number,
  }) => {
    const { request } = useHttp();
    const token = localStorage.getItem("access");
    const res = await request(`${baseUrl}/api/v1/generate_invoices/additional-invoice-for-project/${project_id}/${proposition_id}/`, "GET", null, {
      "accept": "application/json",
      Authorization: `Bearer ${token}`
    });
    return res
  }
)

export const sendInvoiceToEmail = createAsyncThunk(
  "documents/sendInvoiceToEmail",
  async ({ document_id, email }: {
    document_id: number,
    email: string
  }) => {
    const { request } = useHttp();
    const token = localStorage.getItem("access");
    const data = {
      email: email,
      document_id: document_id
    }
    const res = await request(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", JSON.stringify(data), {
      "accept": "application/json",
      Authorization: `Bearer ${token}`
    });
    return res
  }
)




const doocumentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    changeGenerateConfirmedPropositionDocumentLoadingStatus: (state, { payload }) => {
      state.generateConfirmedPropositionDocumentLoadingStatus = payload as LoadingStatusType
    },
    setIsAdditionalInvoiceSubmitted: (state, { payload }) => {
      state.isAdditionalInvoiceSubmitted = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateUnconfirmedPropositionDocument.pending, (state) => {
        state.generatePropositionDocumentLoadingStatus = "loading";
      })
      .addCase(generateUnconfirmedPropositionDocument.fulfilled, (state, { payload }) => {
        state.generatePropositionDocumentLoadingStatus = "idle";
        state.propositionDocument = { ...payload, document: baseUrl + payload.url }
      })
      .addCase(generateUnconfirmedPropositionDocument.rejected, (state) => {
        state.generatePropositionDocumentLoadingStatus = "error";
      })
      .addCase(updateUnconfirmedPropositionDocument.pending, (state) => {
        state.generatePropositionDocumentLoadingStatus = "loading";
      })
      .addCase(updateUnconfirmedPropositionDocument.fulfilled, (state, { payload }) => {
        state.generatePropositionDocumentLoadingStatus = "idle";
        state.propositionDocument = { ...payload, document: baseUrl + payload.url }
      })
      .addCase(updateUnconfirmedPropositionDocument.rejected, (state) => {
        state.generatePropositionDocumentLoadingStatus = "error";
      })
      .addCase(generateConfirmedPropositionDocument.pending, (state) => {
        state.generatePropositionDocumentLoadingStatus = "loading";
      })
      .addCase(generateConfirmedPropositionDocument.fulfilled, (state, { payload }) => {
        state.generatePropositionDocumentLoadingStatus = "idle";
        state.propositionDocument = { ...payload, document: baseUrl + payload.url, name: payload.name }
      })
      .addCase(generateConfirmedPropositionDocument.rejected, (state) => {
        state.generatePropositionDocumentLoadingStatus = "error";
      })
      .addCase(generateIvoices.pending, (state) => {
        state.generateInvoicesLoadingStatus = "loading";
      })
      .addCase(generateIvoices.fulfilled, (state, { payload }) => {
        state.generateInvoicesLoadingStatus = "idle";
        state.invoices = { ...payload, document: baseUrl + payload.url }
      })
      .addCase(generateIvoices.rejected, (state) => {
        state.generateInvoicesLoadingStatus = "error";
      })
      .addCase(generateInvoicesWithoutProject.pending, (state) => {
        state.generateInvoiceWithoutProjectLoadingStatus = "loading";
      })
      .addCase(generateInvoicesWithoutProject.fulfilled, (state, { payload }) => {
        state.generateInvoiceWithoutProjectLoadingStatus = "idle";
        state.invoices = { ...payload, document: baseUrl + payload.url }
      })
      .addCase(generateInvoicesWithoutProject.rejected, (state) => {
        state.generateInvoiceWithoutProjectLoadingStatus = "error";
      })
      .addCase(generateAdditionalInvoice.pending, (state) => {
        state.generateAdditionalInvoiceLoadingStatus = "loading";
      })
      .addCase(generateAdditionalInvoice.fulfilled, (state, { payload }) => {
        state.generateAdditionalInvoiceLoadingStatus = "idle";
        state.additionalInvoice = { ...payload, document: baseUrl + payload.url, additional_invoice_for_project: true }
      })
      .addCase(generateAdditionalInvoice.rejected, (state) => {
        state.generateAdditionalInvoiceLoadingStatus = "error";
      })
      .addDefaultCase((state, action) => { })
  }
})

const { reducer, actions } = doocumentSlice
export const { changeGenerateConfirmedPropositionDocumentLoadingStatus,setIsAdditionalInvoiceSubmitted } = actions
export default reducer