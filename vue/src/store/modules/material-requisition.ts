import { ActionContext, Module } from 'vuex';
import Ajax from '../../lib/ajax';

interface MaterialRequisitionState {
    totalCount: number;
    currentPage: number;
    pageSize: number;
    list: Array<any>;
    loading: boolean;
    splitInfo: any;
}

class MaterialRequisitionModule implements Module<MaterialRequisitionState, any> {
    namespaced = true;

    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<any>(),
        loading: false,
        splitInfo: null
    };

    actions = {
        async getAll(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            context.state.loading = true;
            try {
                let response = await Ajax.get('/api/services/app/MaterialRequisition/GetAll', { params: payload.data });
                let page = response.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items || [];
            } finally {
                context.state.loading = false;
            }
        },
        async getForSplit(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            let response = await Ajax.get('/api/services/app/MaterialRequisition/GetForSplit', {
                params: { id: payload.id }
            });
            context.state.splitInfo = response.data.result;
            return response.data.result;
        },
        async saveSplitDraft(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            let response = await Ajax.post('/api/services/app/MaterialRequisition/SaveSplitDraft', payload.data);
            return response.data.result;
        },
        async confirmSplit(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            let response = await Ajax.post('/api/services/app/MaterialRequisition/ConfirmSplit', payload.data);
            return response.data.result;
        },
        async confirmSplitDraft(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            await Ajax.post('/api/services/app/MaterialRequisition/ConfirmSplitDraft', payload.data);
        },
        async cancelSplitDraft(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            await Ajax.post('/api/services/app/MaterialRequisition/CancelSplitDraft', payload.data);
        },
        async cancelSplitDraftLine(context: ActionContext<MaterialRequisitionState, any>, payload: any) {
            await Ajax.post('/api/services/app/MaterialRequisition/CancelSplitDraftLine', payload.data);
        }
    };

    mutations = {
        setCurrentPage(state: MaterialRequisitionState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: MaterialRequisitionState, pageSize: number) {
            state.pageSize = pageSize;
        }
    };
}

const materialRequisitionModule = new MaterialRequisitionModule();
export default materialRequisitionModule;
