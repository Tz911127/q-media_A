<template>
  <div>
    <div style="margin:15px 0">
      <span style="font-weight:600;margin-right:20px">企业代码:{{row.key}}</span>
      <span style="font-weight:600">企业简称:{{row.name}}</span>
    </div>
    <el-tree
      :data="data"
      :props="defaultProps"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-drop="sort"
      class="tree"
      default-expand-all
      node-key="id"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click.stop="() => append(data)">
            <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
              <i class="el-icon-circle-plus-outline" style="font-size:16px"></i>
            </el-tooltip>
          </el-button>
          <el-button type="text" v-if="node.level != 1" size="mini" @click.stop="() => edit(data)">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <i class="el-icon-edit" style="font-size:16px"></i>
            </el-tooltip>
          </el-button>
          <el-button
            type="text"
            v-if="node.level != 1"
            size="mini"
            @click.stop="() => remove(node, data)"
          >
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <i class="el-icon-delete" style="font-size:16px"></i>
            </el-tooltip>
          </el-button>
        </span>
      </span>
    </el-tree>
    <v-dialog ref="orgTree" :title="title==0?'添加组织机构':'编辑组织机构'" @handleClose="handleClose">
      <org-form ref="addOrgForm"></org-form>
    </v-dialog>
  </div>
</template>

<script>
import { getOrgList, postOrg, delOrg, editOrg, sortOrg } from "@/api/business";
import orgForm from "@/components/form/orgForm";
export default {
  components: { orgForm },
  data() {
    return {
      row: {},
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      title: 0,
      treeData: {}
    };
  },
  methods: {
    getData() {
      getOrgList(this.row).then(res => {
        this.data = res;
      });
    },
    //同级拖拽
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.level === dropNode.level) {
        if (
          draggingNode.data.aboveId === dropNode.data.aboveId &&
          draggingNode.parent.data.label === dropNode.parent.data.label
        ) {
          return type === "prev" || type === "next";
        }
      } else {
        return false;
      }
    },
    allowDrag(draggingNode) {
      return true;
    },
    sort(draggingNode, dropNode, type, event) {
      let obj = {
        aboveId: "",
        arr: []
      };
      obj.aboveId = dropNode.data.aboveId;
      for (let item of dropNode.parent.childNodes) {
        obj.arr.push(item.data.id);
      }
      let drag = dropNode.parent.data.children;
      let params = {
        ids: []
      };
      for (let i = 0; i < drag.length; i++) {
        params.ids.push(drag[i].id);
      }

      sortOrg(params).then(res => {
        this.getData();
      });
    },
    append(data) {
      this.title = 0;
      this.$refs.orgTree.dialogVisible = true;
      this.treeData = data;
    },
    edit(data) {
      this.title = 1;
      this.$refs.orgTree.dialogVisible = true;
      this.treeData = data;
      this.$nextTick(() => {
        this.$refs.addOrgForm.orgForm.name = data.name;
      });
    },
    remove(node, data) {
      let that = this;
      this.confirm(`是否删除此机构？`, "", {
        request: () => {
          let params = {
            id: data.id
          };
          return delOrg(params);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },
    handleClose() {
      this.$refs.addOrgForm.$refs.ruleForm.validate(data => {
        if (data) {
          if (this.title == 0) {
            let params = {
              ck: this.row.key,
              name: this.$refs.addOrgForm.orgForm.name,
              pid: this.treeData.id
            };
            postOrg(params).then(res => {
              this.$refs.orgTree.dialogVisible = false;
              this.toast("创建成功", "success");
              this.getData();
            });
          } else {
            let params = {
              ck: this.row.key,
              name: this.$refs.addOrgForm.orgForm.name,
              pid: this.treeData.pid,
              id: this.treeData.id
            };
            editOrg(params).then(res => {
              this.$refs.orgTree.dialogVisible = false;
              this.toast("编辑成功", "success");
              this.getData();
            });
          }
        }
      });
    }
  },
  mounted() {
    this.row = JSON.parse(this.$route.query.row);
    this.getData();
  }
};
</script>

<style  scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree {
  background: #fff;
  border: 4px;
  padding: 10px;
}
.el-tooltip {
  color: rgba(14, 26, 33, 1);
}
</style>