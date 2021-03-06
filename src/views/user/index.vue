<template>
  <div class="padded">
    <h2>회원</h2>

    <div class="user-filter">
      <el-select v-model="isExit">
        <el-option
          v-for="item in isExitOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <el-table
      v-loading="usersWaiting"
      :data="users.data"
      style="width: 100%"
      @row-click="onRowClick"
    >
      <el-table-column
        prop="name"
        label="이름"
        width="180"
        sortable
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="전화번호"
        width="180"
        sortable
      ></el-table-column>
      <el-table-column
        prop="createdAt"
        label="등록일"
        width="180"
        sortable
      ></el-table-column>
      <el-table-column
        prop="ticketTitle"
        label="보유 수강권"
        width="180"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Skeleton } from 'vue-loading-skeleton';
import { UsersData } from '@/store/user/types';
import { AsyncStatus } from '@/store/types';
import { Watch } from 'vue-property-decorator';

const namespace = 'user';

interface Column {
  id: number;
  name: string;
  phone: string;
  ticketTitle: string;
  createdAt: string;
}

// @ts-ignore
@Component({
  components: {
    Skeleton,
  },
})
export default class User extends Vue {
  data() {
    return {
      isExit: false,
    };
  }

  get isExitOptions() {
    const isExitOptions = [
      {
        label: `전체회원 (${this.users.data ? this.users.data.length : 0})`,
        value: '',
      },
      {
        label: '이용회원',
        value: false,
      },
      {
        label: '정지회원',
        value: true,
      },
    ];
    return isExitOptions;
  }

  get users(): UsersData {
    return this.$store.getters[`${namespace}/getUsers`];
  }

  get usersWaiting() {
    return this.users.status === AsyncStatus.WAITING;
  }

  get usersSuccess() {
    return this.users.status === AsyncStatus.SUCCESS;
  }

  async created() {
    await this.getUsers();
  }

  async getUsers() {
    await this.$store.dispatch(`${namespace}/getUsers`, {
      isExit: this.$data.isExit,
    });
  }

  onRowClick(row: Column) {
    this.$router.push(`/user/detail/${row.id}`);
  }

  @Watch('isExit')
  onIsExitChange() {
    this.getUsers();
  }
}
</script>

<style scoped>
.user-filter {
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>
