<template>
    <div class="material-requisition-page">
        <Card dis-hover>
            <p slot="title">领料配送需求查询</p>
            <Form :label-width="110" label-position="left" inline>
                <Row :gutter="16">
                    <Col span="6">
                        <FormItem label="领料工厂" style="width:100%">
                            <Input v-model="query.requisitionFactory" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="发料工厂" style="width:100%">
                            <Input v-model="query.issueFactory" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="领料申请单号" style="width:100%">
                            <Input v-model="query.requisitionNo" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="领料申请日期" style="width:100%">
                            <DatePicker v-model="query.requisitionDate" type="date" format="yyyy-MM-dd" style="width:100%" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                        <FormItem label="是否配送" style="width:100%">
                            <Select v-model="query.deliveryRequiredText" clearable>
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="配送方式" style="width:100%">
                            <Select v-model="query.deliveryMethod" clearable>
                                <Option value="单次配送">单次配送</Option>
                                <Option value="多次配送">多次配送</Option>
                                <Option value="自行领料">自行领料</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="申请人员工号" style="width:100%">
                            <Input v-model="query.applicantNo" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="特殊库存" style="width:100%">
                            <Input v-model="query.specialStock" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                        <FormItem label="物料" style="width:100%">
                            <Input v-model="query.materialNo" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="拆解状态" style="width:100%">
                            <Select v-model="query.splitStatus" clearable>
                                <Option value="未拆解">未拆解</Option>
                                <Option value="部分拆解">部分拆解</Option>
                                <Option value="已全部拆解">已全部拆解</Option>
                                <Option value="不处理">不处理</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="货源确认状态" style="width:100%">
                            <Select v-model="query.sourceConfirmStatus" clearable>
                                <Option value="未确认">未确认</Option>
                                <Option value="部分已确认">部分已确认</Option>
                                <Option value="全部已确认">全部已确认</Option>
                                <Option value="不处理">不处理</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" class="query-actions">
                        <Button type="primary" icon="ios-search" @click="getPage">查询</Button>
                        <Button class="toolbar-btn" @click="clearQuery">重置</Button>
                    </Col>
                </Row>
            </Form>
        </Card>

        <Card dis-hover class="margin-top-10">
            <p slot="title">领料配送需求列表</p>
            <Table :loading="loading" :columns="columns" :data="list" border :no-data-text="L('NoDatas')" />
            <Page
                show-sizer
                class-name="fengpage"
                class="margin-top-10"
                :total="totalCount"
                :page-size="pageSize"
                :current="currentPage"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange" />
        </Card>

        <Modal v-model="splitModalVisible" title="拆解配送需求" width="1280" :mask-closable="false">
            <div v-if="splitInfo && splitInfo.header">
                <Card dis-hover>
                    <p slot="title">领料单信息</p>
                    <Row :gutter="16">
                        <Col span="8">领料申请单号：<b>{{ splitInfo.header.requisitionNo }}</b></Col>
                        <Col span="8">领料工厂：<b>{{ splitInfo.header.requisitionFactory }}</b></Col>
                        <Col span="8">申请人员工号：<b>{{ splitInfo.header.applicantNo }}</b></Col>
                    </Row>
                </Card>

                <Card dis-hover class="margin-top-10">
                    <p slot="title">已有拆解记录明细</p>
                    <Table :columns="existingDemandColumns" :data="existingDemandRows" border size="small" />
                </Card>

                <Card dis-hover class="margin-top-10">
                    <p slot="title">本次拆解填写</p>
                    <Form :label-width="110" label-position="left">
                        <Row :gutter="16">
                            <Col span="6">
                                <FormItem label="收货库存地点">
                                    <Input v-model="splitForm.receiptStorageLocation" />
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="配送日期">
                                    <DatePicker v-model="splitForm.deliveryDate" type="date" format="yyyy-MM-dd" style="width:100%" />
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="配送时段">
                                    <Select v-model="splitForm.deliveryTimeSlot">
                                        <Option value="上午">上午</Option>
                                        <Option value="下午">下午</Option>
                                        <Option value="全天">全天</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="最后配送日期">
                                    <DatePicker v-model="splitForm.lastDeliveryDate" type="date" format="yyyy-MM-dd" style="width:100%" />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <Table class="split-lines-table" :columns="splitLineColumns" :data="splitLines" border size="small" />
                </Card>
            </div>
            <div slot="footer">
                <Button @click="splitModalVisible = false">取消</Button>
                <Button @click="saveDraft">保存草稿</Button>
                <Button type="primary" @click="confirmSplit">确认拆解</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase';

@Component
export default class MaterialRequisitionCreate extends AbpBase {
    query: any = {
        requisitionFactory: '',
        issueFactory: '',
        requisitionNo: '',
        requisitionDate: null,
        deliveryRequiredText: '',
        deliveryMethod: '',
        applicantNo: '',
        specialStock: '',
        materialNo: '',
        splitStatus: '',
        sourceConfirmStatus: ''
    };

    splitModalVisible = false;
    splitInfo: any = null;
    splitForm: any = {
        receiptStorageLocation: '',
        deliveryDate: null,
        deliveryTimeSlot: '上午',
        lastDeliveryDate: null
    };
    editingDeliveryDemandId: number | null = null;
    splitLines: Array<any> = [];

    get list() {
        return this.$store.state.materialRequisition.list;
    }

    get loading() {
        return this.$store.state.materialRequisition.loading;
    }

    get totalCount() {
        return this.$store.state.materialRequisition.totalCount;
    }

    get pageSize() {
        return this.$store.state.materialRequisition.pageSize;
    }

    get currentPage() {
        return this.$store.state.materialRequisition.currentPage;
    }

    get existingDemandRows() {
        if (!this.splitInfo || !this.splitInfo.existingDemands) {
            return [];
        }

        let rows: Array<any> = [];
        this.splitInfo.existingDemands.forEach((demand: any) => {
            demand.lines.forEach((line: any) => {
                rows.push({
                    deliveryDemandId: demand.id,
                    deliveryDemandLineId: line.id,
                    demandNo: demand.demandNo,
                    lineNo: line.lineNo,
                    materialNo: line.materialNo,
                    demandQuantity: line.demandQuantity,
                    unit: line.unit,
                    receiptStorageLocation: demand.receiptStorageLocation,
                    deliveryDate: this.formatDate(demand.deliveryDate),
                    deliveryTimeSlot: demand.deliveryTimeSlot,
                    lastDeliveryDate: this.formatDate(demand.lastDeliveryDate),
                    status: demand.status
                });
            });
        });
        return rows;
    }

    columns: Array<any> = [
        {
            type: 'expand',
            width: 50,
            render: (h: any, params: any) => {
                const columns = [
                    { title: '行项目', key: 'lineNo', width: 90 },
                    { title: '物料', key: 'materialNo', width: 130 },
                    { title: '申请数量', key: 'quantity', width: 100 },
                    { title: '待拆数量', key: 'remainingQuantity', width: 100 },
                    { title: '基本单位', key: 'unit', width: 90 },
                    { title: '批次', key: 'batch', width: 100 },
                    { title: '认证种类', key: 'certificationType', width: 120 },
                    { title: '备注', key: 'remark', width: 180 },
                    { title: '收货库存地点', key: 'receiptStorageLocation', width: 120 },
                    {
                        title: '需求配送截止日',
                        key: 'requiredDeliveryDate',
                        width: 140,
                        render: (lineH: any, lineParams: any) => lineH('span', this.formatDate(lineParams.row.requiredDeliveryDate))
                    },
                    { title: '需求配送时间段', key: 'requiredDeliveryTimeSlot', width: 140 }
                ];
                return h('Table', {
                    props: {
                        columns: columns,
                        data: params.row.lines || [],
                        size: 'small',
                        border: true
                    }
                });
            }
        },
        { title: '领料工厂', key: 'requisitionFactory', width: 100 },
        { title: '发料工厂', key: 'issueFactory', width: 100 },
        { title: '领料申请单号', key: 'requisitionNo', width: 140 },
        {
            title: '领料申请日期',
            key: 'requisitionDate',
            width: 130,
            render: (h: any, params: any) => h('span', this.formatDate(params.row.requisitionDate))
        },
        {
            title: '是否配送',
            key: 'isDeliveryRequired',
            width: 90,
            render: (h: any, params: any) => h('span', params.row.isDeliveryRequired ? '是' : '否')
        },
        { title: '配送方式', key: 'deliveryMethod', width: 110 },
        { title: '申请人员工号', key: 'applicantNo', width: 130 },
        { title: '申请人电话', key: 'applicantPhone', width: 130 },
        { title: '特殊库存', key: 'specialStock', width: 90 },
        { title: '拆解状态', key: 'splitStatus', width: 110 },
        { title: '货源确认状态', key: 'sourceConfirmStatus', width: 120 },
        {
            title: '操作',
            key: 'actions',
            width: 150,
            fixed: 'right',
            render: (h: any, params: any) => {
                if (params.row.splitStatus === '不处理') {
                    return h('span', '-');
                }
                return h('Button', {
                    props: { type: 'primary', size: 'small' },
                    on: { click: () => this.openSplit(params.row) }
                }, '拆解配送需求');
            }
        }
    ];

    existingDemandColumns: Array<any> = [
        { title: '配送需求单号', key: 'demandNo', width: 160 },
        { title: '行项目', key: 'lineNo', width: 80 },
        { title: '物料', key: 'materialNo', width: 120 },
        { title: '本次数量', key: 'demandQuantity', width: 100 },
        { title: '单位', key: 'unit', width: 70 },
        { title: '收货库存地点', key: 'receiptStorageLocation', width: 120 },
        { title: '配送日期', key: 'deliveryDate', width: 120 },
        { title: '配送时段', key: 'deliveryTimeSlot', width: 90 },
        { title: '最后配送日期', key: 'lastDeliveryDate', width: 120 },
        {
            title: '状态',
            key: 'status',
            width: 100,
            fixed: 'right',
            render: (h: any, params: any) => {
                const color = params.row.status === '草稿' ? 'warning' : params.row.status === '已确认' ? 'success' : 'default';
                return h('Tag', { props: { color: color } }, params.row.status || '-');
            }
        },
        {
            title: '操作',
            key: 'actions',
            width: 180,
            fixed: 'right',
            render: (h: any, params: any) => {
                if (params.row.status !== '草稿') {
                    return h('span', '-');
                }
                return h('div', [
                    h('Button', {
                        props: { type: 'primary', size: 'small' },
                        on: { click: () => this.editDraft(params.row.deliveryDemandId) }
                    }, '修改'),
                    h('Button', {
                        props: { type: 'success', size: 'small' },
                        style: { marginLeft: '4px' },
                        on: { click: () => this.confirmDraft(params.row.deliveryDemandId) }
                    }, '确认'),
                    h('Button', {
                        props: { type: 'error', size: 'small' },
                        style: { marginLeft: '4px' },
                        on: { click: () => this.cancelDraftLine(params.row.deliveryDemandLineId) }
                    }, '撤销')
                ]);
            }
        }
    ];

    splitLineColumns: Array<any> = [
        { title: '行项目', key: 'lineNo', width: 90 },
        { title: '物料', key: 'materialNo', width: 130 },
        { title: '申请数量', key: 'quantity', width: 100 },
        { title: '待拆数量', key: 'remainingQuantity', width: 100 },
        { title: '基本单位', key: 'unit', width: 90 },
        {
            title: '本次数量',
            key: 'demandQuantity',
            width: 150,
            render: (h: any, params: any) => {
                const updateQuantity = (value: any) => {
                    const quantity = value === '' || value === null || isNaN(Number(value)) ? 0 : Number(value);
                    params.row.demandQuantity = quantity;
                    const line = this.splitLines.find((x: any) => x.id === params.row.id);
                    if (line) {
                        line.demandQuantity = quantity;
                    }
                };
                return h('input', {
                    class: 'ivu-input split-quantity-input',
                    attrs: {
                        type: 'number',
                        min: 0,
                        max: params.row.remainingQuantity,
                        step: '0.001'
                    },
                    domProps: {
                        value: params.row.demandQuantity
                    },
                    on: {
                        input: (event: any) => updateQuantity(event.target.value),
                        change: (event: any) => updateQuantity(event.target.value),
                        blur: (event: any) => updateQuantity(event.target.value)
                    }
                });
            }
        },
        { title: '配送需求单号', key: 'demandNo', render: (h: any) => h('span', '系统生成') }
    ];

    async created() {
        await this.getPage();
    }

    async getPage() {
        let data: any = Object.assign({}, this.query);
        data.isDeliveryRequired = data.deliveryRequiredText === '' ? null : data.deliveryRequiredText === 'true';
        delete data.deliveryRequiredText;
        data.requisitionDate = this.toDateString(data.requisitionDate);
        data.maxResultCount = this.pageSize;
        data.skipCount = (this.currentPage - 1) * this.pageSize;

        await this.$store.dispatch({
            type: 'materialRequisition/getAll',
            data: data
        });
    }

    clearQuery() {
        this.query = {
            requisitionFactory: '',
            issueFactory: '',
            requisitionNo: '',
            requisitionDate: null,
            deliveryRequiredText: '',
            deliveryMethod: '',
            applicantNo: '',
            specialStock: '',
            materialNo: '',
            splitStatus: '',
            sourceConfirmStatus: ''
        };
        this.getPage();
    }

    async pageChange(page: number) {
        this.$store.commit('materialRequisition/setCurrentPage', page);
        await this.getPage();
    }

    async pageSizeChange(pageSize: number) {
        this.$store.commit('materialRequisition/setPageSize', pageSize);
        await this.getPage();
    }

    async openSplit(row: any) {
        this.splitInfo = await this.$store.dispatch({
            type: 'materialRequisition/getForSplit',
            id: row.id
        });
        const firstLine = this.splitInfo.header.lines && this.splitInfo.header.lines.length ? this.splitInfo.header.lines[0] : null;
        this.splitForm = {
            receiptStorageLocation: firstLine ? firstLine.receiptStorageLocation : '',
            deliveryDate: new Date(),
            deliveryTimeSlot: firstLine && firstLine.requiredDeliveryTimeSlot ? firstLine.requiredDeliveryTimeSlot : '上午',
            lastDeliveryDate: new Date()
        };
        this.editingDeliveryDemandId = null;
        this.splitLines = this.splitInfo.header.lines.map((line: any) => {
            return Object.assign({}, line, {
                demandQuantity: line.remainingQuantity > 0 ? line.remainingQuantity : 0
            });
        });
        this.splitModalVisible = true;
    }

    async saveDraft() {
        await this.submitSplit('materialRequisition/saveSplitDraft', '已保存为草稿');
    }

    async confirmSplit() {
        await this.submitSplit('materialRequisition/confirmSplit', '拆解配送需求已确认');
    }

    editDraft(deliveryDemandId: number) {
        const demand = this.findExistingDemand(deliveryDemandId);
        if (!demand || demand.status !== '草稿') {
            this.$Message.error('只能修改草稿状态的配送需求');
            return;
        }

        this.editingDeliveryDemandId = demand.id;
        this.splitForm = {
            receiptStorageLocation: demand.receiptStorageLocation,
            deliveryDate: demand.deliveryDate ? new Date(demand.deliveryDate) : null,
            deliveryTimeSlot: demand.deliveryTimeSlot,
            lastDeliveryDate: demand.lastDeliveryDate ? new Date(demand.lastDeliveryDate) : null
        };

        this.splitLines = this.splitInfo.header.lines.map((line: any) => {
            const draftLine = demand.lines.find((x: any) => x.materialRequisitionLineId === line.id);
            return Object.assign({}, line, {
                demandQuantity: draftLine ? draftLine.demandQuantity : 0
            });
        });
        this.$Message.info('草稿已载入本次拆解填写区域');
    }

    async confirmDraft(deliveryDemandId: number) {
        this.$Modal.confirm({
            title: '提示',
            content: '确认该草稿配送需求？',
            onOk: async () => {
                await this.$store.dispatch({
                    type: 'materialRequisition/confirmSplitDraft',
                    data: { deliveryDemandId: deliveryDemandId }
                });
                this.$Message.success('草稿已确认');
                await this.openSplit(this.splitInfo.header);
                await this.getPage();
            }
        });
    }

    async submitSplit(action: string, message: string) {
        this.syncVisibleDemandQuantities();
        if (!this.validateSplit()) {
            return;
        }

        await this.$store.dispatch({
            type: action,
            data: this.buildSplitInput()
        });
        this.$Message.success(message);
        await this.openSplit(this.splitInfo.header);
        await this.getPage();
    }

    async cancelDraft(deliveryDemandId: number) {
        this.$Modal.confirm({
            title: '提示',
            content: '确认撤销该草稿配送需求？',
            onOk: async () => {
                await this.$store.dispatch({
                    type: 'materialRequisition/cancelSplitDraft',
                    data: { deliveryDemandId: deliveryDemandId }
                });
                this.$Message.success('草稿已撤销');
                await this.openSplit(this.splitInfo.header);
                await this.getPage();
            }
        });
    }

    async cancelDraftLine(deliveryDemandLineId: number) {
        this.$Modal.confirm({
            title: '提示',
            content: '确认撤销当前行的本次数量？',
            onOk: async () => {
                await this.$store.dispatch({
                    type: 'materialRequisition/cancelSplitDraftLine',
                    data: { deliveryDemandLineId: deliveryDemandLineId }
                });
                this.$Message.success('当前行已撤销');
                await this.openSplit(this.splitInfo.header);
                await this.getPage();
            }
        });
    }

    buildSplitInput() {
        this.syncVisibleDemandQuantities();
        return {
            deliveryDemandId: this.editingDeliveryDemandId,
            materialRequisitionHeaderId: this.splitInfo.header.id,
            receiptStorageLocation: this.splitForm.receiptStorageLocation,
            deliveryDate: this.toDateString(this.splitForm.deliveryDate),
            deliveryTimeSlot: this.splitForm.deliveryTimeSlot,
            lastDeliveryDate: this.toDateString(this.splitForm.lastDeliveryDate),
            lines: this.splitLines
                .filter((line: any) => line.demandQuantity > 0)
                .map((line: any) => {
                    return {
                        materialRequisitionLineId: line.id,
                        demandQuantity: Number(line.demandQuantity)
                    };
                })
        };
    }

    syncVisibleDemandQuantities() {
        const inputs = this.$el.querySelectorAll('.split-lines-table input');
        inputs.forEach((input: Element, index: number) => {
            if (!this.splitLines[index]) {
                return;
            }
            const value = Number((input as HTMLInputElement).value);
            if (!isNaN(value)) {
                this.splitLines[index].demandQuantity = value;
            }
        });
    }

    findExistingDemand(deliveryDemandId: number) {
        if (!this.splitInfo || !this.splitInfo.existingDemands) {
            return null;
        }
        return this.splitInfo.existingDemands.find((x: any) => x.id === deliveryDemandId);
    }

    validateSplit() {
        if (!this.splitForm.receiptStorageLocation) {
            this.$Message.error('收货库存地点不能为空');
            return false;
        }
        if (!this.splitForm.deliveryDate || !this.splitForm.lastDeliveryDate) {
            this.$Message.error('配送日期和最后配送日期不能为空');
            return false;
        }
        if (new Date(this.splitForm.lastDeliveryDate).getTime() < new Date(this.splitForm.deliveryDate).getTime()) {
            this.$Message.error('最后配送日期不能早于配送日期');
            return false;
        }
        if (!this.splitLines.some((line: any) => line.demandQuantity > 0)) {
            this.$Message.error('本次数量必须大于 0');
            return false;
        }
        if (this.splitLines.some((line: any) => line.demandQuantity > line.remainingQuantity)) {
            this.$Message.error('本次数量不能超过待拆数量');
            return false;
        }
        return true;
    }

    toDateString(value: any) {
        if (!value) {
            return null;
        }
        const date = new Date(value);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    formatDate(value: any) {
        const dateString = this.toDateString(value);
        return dateString || '';
    }
}
</script>

<style scoped>
.material-requisition-page .toolbar-btn {
    margin-left: 8px;
}

.material-requisition-page .query-actions {
    padding-top: 32px;
}

.material-requisition-page .margin-top-10 {
    margin-top: 10px;
}

.material-requisition-page .split-quantity-input {
    width: 100%;
}
</style>
