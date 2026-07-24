
ALTER TABLE aimp_wct.skill MODIFY COLUMN SkillCode varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '技能编码';

ALTER TABLE aimp_wct.allocationjobitem ADD Vltyp varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '源仓储类型';
ALTER TABLE aimp_wct.allocationjobitem CHANGE Vltyp Vltyp varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '源仓储类型' AFTER BlocId;

ALTER TABLE aimp_wct.storageclass ADD RegionId INT NULL COMMENT '所属区域Id';
ALTER TABLE aimp_wct.storageclass CHANGE RegionId RegionId INT NULL COMMENT '所属区域Id' FIRST;

CREATE TABLE `material_requisition` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_REQUISITION_NO` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单号',
  `C_REQUISITION_FACTORY` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料工厂',
  `C_ISSUE_FACTORY` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发货工厂',
  `C_MES_LGPLA` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'MES仓位',
  `D_REQUISITION_DATE` datetime DEFAULT NULL COMMENT '领料单创建日期',
  `N_IS_DELIVERY_REQUIRED` tinyint(1) NOT NULL COMMENT '是否需要配送',
  `C_DELIVERY_METHOD` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送方式（A：单次配送，B：多次配送）',
  `C_APPLICANT_NO` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '申请人编号',
  `C_APPLICANT_PHONE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '申请人电话',
  `C_SPECIAL_STOCK` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '特殊库存标识',
  `C_ORGANIZATION_UNIT` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '组织单位',
  `C_LINE_NO` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '行号',
  `C_MATERIAL_NO` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '物料号',
  `N_QUANTITY` decimal(18,3) NOT NULL COMMENT '领用数量',
  `C_UNIT` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '计量单位',
  `C_BATCH` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '批次',
  `C_CERTIFICATION_TYPE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证种类',
  `C_REMARK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `C_ISSUE_STORAGE_LOCATION` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发货库存地点',
  `C_RECEIPT_STORAGE_LOCATION` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '收货库存地点',
  `D_DELIVERY_DATE` datetime DEFAULT NULL COMMENT '配送日期',
  `C_DELIVERY_TIME_SLOT` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送时间段',
  `D_LAST_DELIVERY_DATE` datetime DEFAULT NULL COMMENT '最后配送日期',
  `C_SPLIT_STATUS` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '拆分状态（0：未拆解 1：部分拆解 2：已全部拆解 -1：不处理）',
  `C_SOURCE_CONFIRM_STATUS` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源确认状态（0：未确认 1：部分已确认 2：全部已确认 -1：不处理）',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_C_REQUISITION_NO` (`C_REQUISITION_NO`,`C_LINE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领料单';


CREATE TABLE `material_requisition_detail` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_MAIN_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单主键',
  `C_REQUISITION_NO` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单号',
  `C_LINE_NO` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '行号',
  `C_MATERIAL_NO` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '物料号',
  `N_QUANTITY` decimal(18,3) NOT NULL COMMENT '领用数量',
  `C_UNIT` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '计量单位',
  `C_BATCH` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '批次',
  `C_CERTIFICATION_TYPE` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证种类',
  `C_REMARK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_REQ_LINE_NO` (`C_REQUISITION_NO`,`C_LINE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领料单行项目';


CREATE TABLE `delivery_demand` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_REQUISITION_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单主键',
  `C_DEMAND_NO` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '需求单号',
  `C_REQUISITION_NO` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单号',
  `C_RECEIPT_STORAGE_LOCATION` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '收货库存地点',
  `D_DELIVERY_DATE` datetime DEFAULT NULL COMMENT '配送日期',
  `C_DELIVERY_TIME_SLOT` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送时间段',
  `D_LAST_DELIVERY_DATE` datetime DEFAULT NULL COMMENT '最后配送日期',
  `N_DEMAND_QUANTITY` decimal(18,3) NOT NULL COMMENT '配送需求数量',
  `C_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '单据状态（0：草稿 1：已确认 2：已取消）',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_C_DEMAND_NO` (`C_DEMAND_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='配送需求表';


CREATE TABLE `delivery_demand_detail` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_MAIN_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送需求ID',
  `C_REQUISITION_DETAIL_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单行项目ID',
  `C_REQUISITION_NO` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '领料单号',
  `C_LINE_NO` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '行号',
  `N_DEMAND_QUANTITY` decimal(18,3) NOT NULL COMMENT '配送需求数量',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DEL_LINE_NO` (`C_MAIN_ID`,`C_LINE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='配送需求行表';


CREATE TABLE `source_trial_batch` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TRIAL_BATCH_NO` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '试算批次号',
  `N_DEMAND_COUNT` int NOT NULL COMMENT '参与配送需求数量',
  `C_TRIAL_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '试算状态（0：试算中 1：试算成功 2：试算失败）',
  `C_SOLVER_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '求解器状态（0：未调用 1：求解成功 2：求解失败）',
  `N_IS_CURRENT` tinyint(1) NOT NULL COMMENT '是否当前有效批次',
  `D_TRIAL_TIME` datetime NOT NULL COMMENT '执行试算时间',
  `C_ERROR_MESSAGE` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '错误信息',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_TRIAL_BATCH_NO` (`C_TRIAL_BATCH_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='货源试算批次';


CREATE TABLE `source_trial_batch_demand` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TRIAL_BATCH_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '试算批次ID',
  `C_DELIVERY_DEMAND_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送需求ID',
  `C_DEMAND_NO` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送需求单号',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_BATCH_DEMAND` (`C_TRIAL_BATCH_ID`,`C_DELIVERY_DEMAND_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='货源试算批次配送需求关系';


CREATE TABLE `source_trial_inventory_source` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TRIAL_BATCH_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '试算批次ID',
  `C_SOURCE_TYPE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源类型（1：厂内资材库 2：码头仓库）',
  `C_SOURCE_NO` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源标识',
  `D_USABLE_TIME` datetime DEFAULT NULL COMMENT '库存可使用时间',
  `N_AVAILABLE_QUANTITY` decimal(18,3) NOT NULL COMMENT '可供量',
  `N_OCCUPIED_QUANTITY` decimal(18,3) DEFAULT NULL COMMENT '占用量',
  `N_DELAY_COST` decimal(18,2) DEFAULT NULL COMMENT '延滞成本',
  `N_OPERATION_COST` decimal(18,2) DEFAULT NULL COMMENT '作业成本',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂',
  `C_MATNR` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '物料号',
  `C_LGORT` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '库存地点',
  `C_CHARG` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '批次',
  `C_BESTQ` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '库存类型',
  `N_GESME` decimal(13,3) DEFAULT NULL COMMENT '数量',
  `C_MEINS` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '单位',
  `C_LGNUM` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仓库号',
  `C_LGTYP` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仓储类型',
  `C_LGPLA` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仓位',
  `C_RZZL` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证种类',
  `D_LWEDT` datetime DEFAULT NULL COMMENT '收货日期',
  `C_VBELN` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内向交货单',
  `C_VBELP` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内向交货单行项目',
  `C_TKNUM` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '装运编号',
  `C_TPNUM` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '装运项目',
  `C_BUKRS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '公司代码',
  `C_ZZCM` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '船名',
  `C_ZZHC` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '航次',
  `D_MTMD_DQR` datetime DEFAULT NULL COMMENT '码头免堆到日期',
  `N_YQYZ_FEE` decimal(10,2) DEFAULT NULL COMMENT '逾期延滞费',
  `D_ZZRQ` datetime DEFAULT NULL COMMENT '转栈日期',
  `C_SOBKZ` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '特殊库存标识',
  `C_SONUM` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '特殊库存编号',
  `C_ZNOCHK` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '是否免检',
  `N_JYSJ` decimal(13,0) DEFAULT NULL COMMENT '检验时间',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  KEY `IX_INV_BATCH` (`C_TRIAL_BATCH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='厂内资材库与码头仓库SAP货源快照';


CREATE TABLE `source_trial_supplier_source` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TRIAL_BATCH_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '试算批次ID',
  `C_SOURCE_NO` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源标识',
  `D_USABLE_TIME` datetime DEFAULT NULL COMMENT '库存可使用时间',
  `N_AVAILABLE_QUANTITY` decimal(18,3) NOT NULL COMMENT '可供量',
  `N_OPERATION_COST` decimal(18,2) DEFAULT NULL COMMENT '作业成本',
  `C_YYSHD` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约送货单号',
  `C_VBELN` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '交货',
  `C_POSNR` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '交货项目',
  `C_PLAN_A_F` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '厂区',
  `C_PLAN_A_T` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '厂区',
  `C_YYZT` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约状态',
  `C_EBELN` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '采购凭证号',
  `C_EBELP` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '采购凭证的项目编号',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂',
  `C_MATNR` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '物料编号',
  `C_YSFS` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '运输工具',
  `C_CHARG` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '批号',
  `C_CCMC` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '车/船名',
  `C_CHEX` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '车型',
  `C_YYLX` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约类型',
  `C_BZLX` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '包装类型',
  `C_YLTYP` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '源仓储类型',
  `N_YYSHL` decimal(13,3) DEFAULT NULL COMMENT '预约送货量',
  `C_MEINS` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '基本计量单位',
  `N_YYJS` decimal(13,3) DEFAULT NULL COMMENT '预约件数',
  `N_DJBZZ` decimal(13,3) DEFAULT NULL COMMENT '单件标准重量',
  `C_JZXGG` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '集装箱规格',
  `N_JZXSL` decimal(13,3) DEFAULT NULL COMMENT '集装箱数量',
  `N_SYXL` decimal(13,3) DEFAULT NULL COMMENT '剩余箱量',
  `N_DJBZWZ` decimal(13,3) DEFAULT NULL COMMENT '单件包装物重',
  `N_YYBZZ` decimal(13,3) DEFAULT NULL COMMENT '预约包装物总重',
  `D_SCDAT` datetime DEFAULT NULL COMMENT '生产日期',
  `C_BZDAT` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '保质期',
  `D_DCDAT` datetime DEFAULT NULL COMMENT '预约到厂日',
  `D_HJDAT` datetime DEFAULT NULL COMMENT '货架寿命到期日',
  `D_ZCDAT` datetime DEFAULT NULL COMMENT '最迟有效到厂日',
  `C_RZZL` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证种类',
  `C_RZBL` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证比例',
  `C_RZH` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证号',
  `C_JZXH` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '集装箱号',
  `C_SJXM` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '司机姓名',
  `C_SJDH` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '司机电话',
  `C_TKNUM` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '短驳运输计划',
  `C_ZQFH` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '铅封号',
  `C_TDH` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '总单号/提运单号',
  `C_PACK_NO` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配载编号',
  `C_BOXTYP` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '箱型',
  `N_MILEAGE` decimal(13,3) DEFAULT NULL COMMENT '里程',
  `C_MILEUNIT` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '里程单位',
  `C_INCLUDE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '修改记录',
  `C_CNAME_CRE` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '记录创建者',
  `D_CDATE_CRE` datetime DEFAULT NULL COMMENT '创建日期',
  `C_CTIME_CRE` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建时间',
  `C_UNAME_UPD` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '记录修改者',
  `D_UDATE_UPD` datetime DEFAULT NULL COMMENT '修改日期',
  `C_UTIME_UPD` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '修改时间',
  `C_DEL_IND` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '删除标记',
  `C_ZNOCHK` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '是否免检',
  `N_JYSJ` decimal(13,0) DEFAULT NULL COMMENT '检验时间',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  KEY `IX_SUP_BATCH` (`C_TRIAL_BATCH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='供应商送货SAP货源快照';


CREATE TABLE `source_trial_allocation_result` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TRIAL_BATCH_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '试算批次ID',
  `C_DELIVERY_DEMAND_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送需求ID',
  `C_SOURCE_TYPE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源类型（1：厂内资材库 2：码头仓库 3：供应商送货）',
  `C_SOURCE_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源快照ID',
  `N_SUGGEST_QUANTITY` decimal(18,3) NOT NULL COMMENT '系统建议数量',
  `N_CONFIRM_QUANTITY` decimal(18,3) DEFAULT NULL COMMENT '人工确认数量',
  `N_TOTAL_COST` decimal(18,2) DEFAULT NULL COMMENT '分配总成本',
  `C_CHECK_RESULT` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '校验结果',
  `C_ADJUST_REASON` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '不选/调整原因',
  `C_CONFIRM_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '确认状态（0：未确认 1：已确认）',
  `D_CONFIRM_TIME` datetime DEFAULT NULL COMMENT '确认时间',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  KEY `IX_RESULT_BATCH` (`C_TRIAL_BATCH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='货源试算分配结果';


CREATE TABLE `material_operation_cost` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_MATERIAL_NO` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '物料号',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂',
  `N_IN_PLANT_COST` decimal(18,2) DEFAULT NULL COMMENT '厂内资材库作业成本',
  `N_WHARF_COST` decimal(18,2) DEFAULT NULL COMMENT '码头仓库作业成本',
  `N_SUPPLIER_COST` decimal(18,2) DEFAULT NULL COMMENT '供应商送货作业成本',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_MATERIAL_OPERATION_COST` (`C_MATERIAL_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='物料作业成本';


CREATE TABLE `material_delivery_limit` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_MATERIAL_NO` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '物料号',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂代码',
  `C_LGORT` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '库存地点',
  `C_LGTYP` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仓储类型',
  `C_PACKAGING_TYPE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '包装方式',
  `C_PACKAGING_UNIT` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '包装单位',
  `N_MAX_DELIVERY_QTY_PER_TRIP` decimal(18,3) NOT NULL COMMENT '单次配送量上限',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='物料单次配送上限';

CREATE TABLE `delivery_order` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_DELIVERY_ORDER_NO` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送单号',
  `C_LINE_NO` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '行号',
  `C_ALLOCATION_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源分配结果ID',
  `N_DELIVERY_QUANTITY` decimal(18,3) NOT NULL COMMENT '配送数量',
  `C_EXTERNAL_DOC_NO` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '外部单据号',
  `C_EXTERNAL_DOC_ITEM` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '外部单据行项目',
  `C_DISPATCH_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '下发状态(1:下发成功 2:下发失败)',
  `C_DISPATCH_FAIL_REASON` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '下发失败原因',
  `C_TASK_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '任务单ID',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DELIVERY_ORDER_NO` (`C_DELIVERY_ORDER_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='配送单表';

CREATE TABLE `paper_machine_relation_map` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_REGION_ID` int NOT NULL COMMENT '所属区域Id',
  `C_ORGANIZATION_UNIT` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '申请部门',
  `C_MES_LGPLA` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'MES仓位',
  `C_REMARK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_PAPER_MACHINE_MAP` (`C_REGION_ID`,`C_ORGANIZATION_UNIT`,`C_MES_LGPLA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='纸机关系映射表';

CREATE TABLE `delivery_task` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TASK_NO` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务单号',
  `C_TASK_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务状态（0：待派工 1：已派工 2：执行中 3：已完成 4：已取消）',
  `C_SOURCE_TYPE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '货源类型（1：厂内资材库 2：码头仓库 3：供应商送货）',
  `N_DELIVERY_ORDER_COUNT` int NOT NULL COMMENT '配送单数',
  `N_MATERIAL_ITEM_COUNT` int NOT NULL COMMENT '物料项数',
  `N_STAFF_ID` int DEFAULT NULL COMMENT '执行人ID',
  `C_CURRENT_DEVICE_NO` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '当前设备号',
  `C_CURRENT_DEVICE_TYPE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '当前设备类型',
  `D_EARLIEST_LAST_DELIVERY_DATE` datetime DEFAULT NULL COMMENT '最早最后配送日期',
  `D_ASSIGN_TIME` datetime DEFAULT NULL COMMENT '派工时间',
  `D_START_TIME` datetime DEFAULT NULL COMMENT '开始时间',
  `D_FINISH_TIME` datetime DEFAULT NULL COMMENT '结束时间',
  `D_CANCEL_TIME` datetime DEFAULT NULL COMMENT '取消时间',
  `C_CANCEL_REASON` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '取消原因',
  `C_REMARK` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DELIVERY_TASK_NO` (`C_TASK_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领用配送任务';


CREATE TABLE `delivery_task_detail` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TASK_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务ID',
  `C_DELIVERY_ORDER_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送单ID',
  `N_PLAN_QUANTITY` decimal(18,3) NOT NULL COMMENT '计划数量',
  `N_ACTUAL_QUANTITY` decimal(18,3) DEFAULT NULL COMMENT '实际完成数量',
  `C_DIFFERENCE_REASON` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '差异原因',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_TASK_DELIVERY_ORDER` (`C_DELIVERY_ORDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领用配送任务明细';


CREATE TABLE `delivery_task_device` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TASK_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务ID',
  `C_DEVICE_NO` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设备号',
  `C_DEVICE_TYPE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '设备类型',
  `N_STAFF_ID` int NOT NULL COMMENT '执行人ID',
  `D_BIND_TIME` datetime NOT NULL COMMENT '绑定时间',
  `C_CHANGE_REASON` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '变更原因',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  KEY `IX_TASK_DEVICE_TASK` (`C_TASK_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领用配送任务设备使用明细';


CREATE TABLE `delivery_task_log` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_TASK_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务ID',
  `D_OPERATION_TIME` datetime NOT NULL COMMENT '操作时间',
  `C_OPERATION_TYPE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作类型',
  `C_OPERATOR_NAME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作人',
  `C_DEVICE_NO` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '设备号',
  `C_DEVICE_TYPE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '设备类型',
  `C_REMARK` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '说明',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  KEY `IX_TASK_LOG_TASK` (`C_TASK_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领用配送任务操作日志';

CREATE TABLE `shorthaul_appointment` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_YYSHD` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约送货单号',
  `C_VBELN` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '交货',
  `C_POSNR` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '交货项目',
  `C_PLAN_A_F` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '厂区',
  `C_PLAN_A_T` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '厂区',
  `C_YYZT` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约状态',
  `C_EBELN` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '采购凭证号',
  `C_EBELP` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '采购凭证的项目编号',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂',
  `C_MATNR` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '物料编号',
  `C_YSFS` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '运输工具',
  `C_CHARG` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '批号',
  `C_CCMC` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '车/船名',
  `C_CHEX` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '车型',
  `C_YYLX` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约类型',
  `C_BZLX` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '包装类型',
  `C_YLTYP` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '源仓储类型',
  `N_YYSHL` decimal(13,3) DEFAULT NULL COMMENT '预约送货量',
  `C_MEINS` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '基本计量单位',
  `N_YYJS` decimal(13,3) DEFAULT NULL COMMENT '预约件数',
  `N_DJBZZ` decimal(13,3) DEFAULT NULL COMMENT '单件标准重量',
  `C_JZXGG` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '集装箱规格',
  `N_JZXSL` decimal(13,3) DEFAULT NULL COMMENT '集装箱数量',
  `N_SYXL` decimal(13,3) DEFAULT NULL COMMENT '剩余箱量',
  `N_DJBZWZ` decimal(13,3) DEFAULT NULL COMMENT '单件包装物重',
  `N_YYBZZ` decimal(13,3) DEFAULT NULL COMMENT '预约包装物总重',
  `D_SCDAT` datetime DEFAULT NULL COMMENT '生产日期',
  `C_BZDAT` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '保质期',
  `D_DCDAT` datetime DEFAULT NULL COMMENT '预约到厂日',
  `D_HJDAT` datetime DEFAULT NULL COMMENT '货架寿命到期日',
  `D_ZCDAT` datetime DEFAULT NULL COMMENT '最迟有效到厂日',
  `C_RZZL` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证种类',
  `C_RZBL` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证比例',
  `C_RZH` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '认证号',
  `C_JZXH` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '集装箱号',
  `C_SJXM` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '司机姓名',
  `C_SJDH` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '司机电话',
  `C_TKNUM` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '短驳运输计划',
  `C_ZQFH` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '铅封号',
  `C_TDH` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '总单号/提运单号',
  `C_PACK_NO` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配载编号',
  `C_BOXTYP` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '箱型',
  `N_MILEAGE` decimal(13,3) DEFAULT NULL COMMENT '里程',
  `C_MILEUNIT` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '里程单位',
  `C_INCLUDE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '修改记录',
  `C_CNAME_CRE` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '记录创建者',
  `D_CDATE_CRE` datetime DEFAULT NULL COMMENT '创建日期',
  `C_CTIME_CRE` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建时间',
  `C_UNAME_UPD` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '记录修改者',
  `D_UDATE_UPD` datetime DEFAULT NULL COMMENT '修改日期',
  `C_UTIME_UPD` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '修改时间',
  `C_DEL_IND` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '删除标记',
  `C_ZNOCHK` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '是否免检',
  `N_JYSJ` decimal(13,0) DEFAULT NULL COMMENT '检验时间',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='短驳计划预约关系表';


CREATE TABLE `shorthaul_appointment_delivery_order` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_DELIVERY_ORDER_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '配送单ID',
  `C_SHORTHAUL_APPOINTMENT_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '预约归档ID(shorthaul_appointment)',
  `C_YYSHD` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '预约送货单号',
  `N_MATCH_QTY` decimal(18,3) DEFAULT NULL COMMENT '摊到该配送单的量',
  `C_SYNC_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '同步SAP状态(0:未同步 1:已同步)',
  `D_SYNC_TIME` datetime DEFAULT NULL COMMENT '同步SAP时间',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_YYSHD_DELIVERY_ORDER_NO` (`C_YYSHD`,`C_DELIVERY_ORDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='短驳预约配送单关系表';


CREATE TABLE `delivery_material_post_result` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `C_DELIVERY_ORDER_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配送单ID',
  `C_TASK_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务ID',
  `C_PSXQD` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送需求单',
  `C_PSXQH` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送需求行号',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂',
  `N_JPSL` decimal(13,3) DEFAULT NULL COMMENT '实际发货数量',
  `C_POST_STATUS` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '过账状态（0：待过账 1：成功 2：失败）',
  `N_RETRY_COUNT` int NOT NULL DEFAULT 0 COMMENT '重试次数',
  `D_POST_TIME` datetime DEFAULT NULL COMMENT '最近过账时间',
  `C_TYPE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'SAP消息类型（S成功 E错误 W警告 I信息 A中断）',
  `C_MESSAGE` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '过账结果/失败原因',
  `C_LLJPD` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '领料拣配单号',
  `C_LLJPDHXM` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '领料拣配单行项目',
  `C_ZPSXQ` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送需求单',
  `C_ZPSXQH` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送需求行号',
  `C_LLSQD` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '领料申请单号',
  `C_LLPOS` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '领料申请行项目',
  `C_MBLNR` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '物料凭证编号',
  `C_MJAHR` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '物料凭证年度',
  `C_ZEILE` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '物料凭证中的项目',
  `C_LGNUM` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仓库号',
  `C_TANUM` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '转储单编号',
  `C_TAPOS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '转储单项目',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_POST_DELIVERY_ORDER` (`C_DELIVERY_ORDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='领料件过账结果表';


CREATE TABLE `material_operation_vehicle_config` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `N_FACTORY_AREA_ID` int NOT NULL COMMENT '厂区',
  `N_BUSINESS_TYPE` tinyint NOT NULL COMMENT '业务 1-纸成品 2-资材 3-浆成品',
  `N_SCENE_TYPE` tinyint DEFAULT NULL COMMENT '场景 1-采购收货 2-厂内领用发货 3-让售发货 4-委外加工发货 5-固危废发货',
  `C_MTART` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '物料类型',
  `C_MATKL` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '物料组',
  `C_MATNR` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '物料',
  `N_ATMS_PACK_TYPE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ATMS包装方式 A-散货类 B-包装袋类 C-桶装类 D-多包材类(标准件) E-多包材类(非标准件) F-其它',
  `C_WERKS` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '工厂代码',
  `C_LGORT` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '库存地点',
  `C_LGTYP` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '仓储类型',
  `N_FORKLIFT_TYPE` tinyint NOT NULL COMMENT '叉车类型 1-抱叉 2-平叉 3-铲车',
  `N_FORKLIFT_LOAD_LIMIT` decimal(13,3) DEFAULT NULL COMMENT '叉车载重限制',
  `C_FORKLIFT_REMARK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '叉车备注',
  `N_NEED_SHUTTLE` tinyint(1) NOT NULL DEFAULT '0' COMMENT '需要短驳 0-否 1-是',
  `N_SHUTTLE_TYPE` tinyint DEFAULT NULL COMMENT '短驳车类型 1-平板车 2-自卸车',
  `N_SHUTTLE_LOAD_LIMIT` decimal(13,3) DEFAULT NULL COMMENT '短驳载重限制',
  `C_SHUTTLE_REMARK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '短驳备注',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_MOV_CONFIG` (`N_FACTORY_AREA_ID`,`N_BUSINESS_TYPE`,`C_MTART`,`C_MATKL`,`C_MATNR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='厂内作业车辆配置表';


CREATE TABLE `vehicle_skill_requirement` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `N_DEVICE_KIND` int NOT NULL COMMENT '设备大类（1-叉车 2-短驳车）',
  `N_DEVICE_TYPE` int NOT NULL COMMENT '设备类型（叉车大类下（1-抱叉，2-平叉，3-铲车），短驳车大类下（1-平板车，2-自卸车））',
  `N_SKILL_TYPE` int NOT NULL COMMENT '技能类型（1-抱叉，2-平叉，3-短驳）',
  `C_REMARK` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DEVICE_SKILL` (`N_DEVICE_KIND`,`N_DEVICE_TYPE`,`N_SKILL_TYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='车辆技能要求维护';

-- 1. 员工时段负责业务表
CREATE TABLE `dispatch_staff_duty` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `N_STAFF_ID` int NOT NULL COMMENT '员工Id (staff.Id)',
  `N_START_HOUR` tinyint NOT NULL COMMENT '时段开始小时 0/4/8/12/16/20',
  `N_END_HOUR` tinyint NOT NULL COMMENT '时段结束小时 4/8/12/16/20/24',
  `N_BUSINESS_TYPE` tinyint NOT NULL COMMENT '负责业务 1-纸成品 2-资材 3-浆成品',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DISPATCH_STAFF_DUTY` (`N_STAFF_ID`,`N_START_HOUR`,`N_END_HOUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='员工时段负责业务表';

-- 2. 任务排序表
CREATE TABLE `dispatch_task_sort` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `N_FACTORY_AREA_ID` int NOT NULL COMMENT '厂区Id',
  `N_BUSINESS_TYPE` tinyint NOT NULL COMMENT '业务 1-纸成品 2-资材 3-浆成品',
  `N_SCENE_TYPE` tinyint NOT NULL COMMENT '场景类型 1-采购收货 2-厂内领用发货 3-让售发货 4-委外加工发货 5-固危废发货',
  `N_SCENE_GRADE` tinyint NOT NULL COMMENT '场景分级',
  `N_SORT_ORDER` int NOT NULL COMMENT '分级排序(同一分级内的顺序)',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DISPATCH_TASK` (`N_FACTORY_AREA_ID`,`N_BUSINESS_TYPE`,`N_SCENE_TYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='任务排序表';

-- 3. 技能排序表
CREATE TABLE `dispatch_skill_sort` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `N_FACTORY_AREA_ID` int NOT NULL COMMENT '厂区Id',
  `N_TASK_TYPE` tinyint NOT NULL COMMENT '任务类型 1-卷筒任务 2-平板任务 3-卷平任务',
  `N_SKILL_TYPE` tinyint NOT NULL COMMENT '技能分类 1-卷平 2-卷筒 3-平板',
  `N_SKILL_GRADE_SORT` tinyint NOT NULL COMMENT '技能分级排序',
  `N_INNER_SORT` int NOT NULL COMMENT '分级内排序',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DISPATCH_SKILL` (`N_FACTORY_AREA_ID`,`N_TASK_TYPE`,`N_SKILL_TYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='技能排序表';

-- 4. 技能指标排序表
CREATE TABLE `dispatch_skill_metric_sort` (
  `C_ID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键',
  `N_FACTORY_AREA_ID` int NOT NULL COMMENT '厂区Id',
  `N_SKILL_TYPE` tinyint NOT NULL COMMENT '技能 1-卷平 2-卷筒 3-平板',
  `N_METRIC_TYPE` tinyint NOT NULL COMMENT '指标 1-今日作业量 2-平均日作业量 3-当月总作业量 4-累计作业量 5-工龄',
  `N_SORT_DIRECTION` tinyint NOT NULL COMMENT '排序 1-升序 2-降序',
  `N_PRIORITY` int NOT NULL COMMENT '优先级(数字越小越优先)',
  `D_CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `N_CREATOR` bigint DEFAULT NULL COMMENT '创建人',
  `D_LAST_MODIFY_TIME` datetime DEFAULT NULL COMMENT '更新时间',
  `N_LAST_MODIFIER` bigint DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`C_ID`),
  UNIQUE KEY `UK_DISPATCH_METRIC` (`N_FACTORY_AREA_ID`,`N_SKILL_TYPE`,`N_METRIC_TYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='技能指标排序表';