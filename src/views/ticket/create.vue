<template>
  <div>
    <!-- Header -->
    <div class="create-header">
      <div class="create-header-block">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-bottom: 12px"
        >
          <el-breadcrumb-item :to="{ path: '/ticket' }"
            >수강권</el-breadcrumb-item
          >
          <el-breadcrumb-item>수강권등록</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="create-header-block__title">
          <h3>수강권 생성</h3>
          <el-select v-model="classType" style="margin-left: 10px">
            <el-option
              v-for="item in classTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- Middle -->
    <div class="create-form">
      <!-- 수강권 종류 -->
      <div class="create-form-block">
        <div class="create-form-block__index">01</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수강권명 입력</div>
          </div>
          <div class="create-form-block__input">
            <el-input v-model="title" class="el-custom-input" />
          </div>
        </div>
      </div>

      <!-- 설명 -->
      <div class="create-form-block">
        <div class="create-form-block__index">02</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">설명</div>
          </div>
          <div class="create-form-block__input">
            <el-input v-model="description" class="el-custom-input" />
          </div>
        </div>
      </div>

      <!-- 총 이용 횟수 -->
      <div class="create-form-block">
        <div class="create-form-block__index">03</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">이용 횟수</div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form-block__coupon-count">
              <div>
                <label>총 이용횟수</label>
                <el-input-number
                  v-model.number="maxCoupon"
                  :min="1"
                ></el-input-number>
              </div>
              <div>
                <label>취소 가능 횟수</label>
                <el-input-number
                  v-model.number="maxCancel"
                  :min="1"
                  :max="maxCoupon"
                ></el-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 수강권 사용기한 -->
      <div class="create-form-block">
        <div class="create-form-block__index">04</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수강권 사용기한</div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form__class-period">
              <el-radio
                v-model="availableDays"
                :label="30"
                @change="isAvailableDaysSelf = false"
                >1개월 (30일)</el-radio
              >
              <el-radio
                v-model="availableDays"
                :label="60"
                @change="isAvailableDaysSelf = false"
                >2개월 (60일)</el-radio
              >
              <el-radio
                v-model="availableDays"
                :label="90"
                @change="isAvailableDaysSelf = false"
                >3개월 (90일)</el-radio
              >
              <el-radio
                v-model="availableDays"
                :label="180"
                @change="isAvailableDaysSelf = false"
                >6개월 (180일)</el-radio
              >
              <el-radio
                v-model="availableDays"
                :label="365"
                @change="isAvailableDaysSelf = false"
                >1년 (365일)</el-radio
              >
              <div v-if="isAvailableDaysSelf">
                <el-input-number
                  v-model.number="availableDays"
                  :min="1"
                ></el-input-number>
              </div>
              <div v-else>
                <el-radio
                  v-model="availableDays"
                  :label="1"
                  @change="isAvailableDaysSelf = true"
                  >직접 입력</el-radio
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--수강 인원 정보 입력 -->
      <div class="create-form-block">
        <div class="create-form-block__index">05</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">수강 인원 설정</div>
          </div>
          <div class="create-form-block__input">
            <el-input-number
              v-model.number="maxTrainee"
              :min="1"
            ></el-input-number>
          </div>
        </div>
      </div>

      <!--수강권 판매 정보 입력 -->
      <div class="create-form-block">
        <div class="create-form-block__index">06</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">판매가 입력</div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form-block__price-input">
              <el-input
                v-model.number="price"
                class="el-custom-input"
                style="max-width: 200px"
              >
                <span slot="suffix">원</span>
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <!-- 주간/월간 이용 횟수 설정 -->
      <div class="create-form-block">
        <div class="create-form-block__index">07</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">
              주간/월간 이용 횟수 설정
            </div>
          </div>
          <div class="create-form-block__input">
            <div class="custom-radio-group">
              <label
                :class="{ active: bookingLimitCriteria === 'week' }"
                @click="bookingLimitCriteria = 'week'"
                >주간 이용 횟수</label
              >
              <label
                :class="{ active: bookingLimitCriteria === 'month' }"
                @click="bookingLimitCriteria = 'month'"
                >월간 이용 횟수</label
              >
            </div>
            <div class="create-form-block__weekly-booking-limit">
              <el-radio
                v-model="bookingLimit"
                :label="0"
                @change="isBookingLimitSelf = false"
                >제한없음</el-radio
              >
              <el-radio
                v-model="bookingLimit"
                :label="1"
                @change="isBookingLimitSelf = false"
                >1회</el-radio
              >
              <el-radio
                v-model="bookingLimit"
                :label="2"
                @change="isBookingLimitSelf = false"
                >2회</el-radio
              >
              <el-radio
                v-model="bookingLimit"
                :label="3"
                @change="isBookingLimitSelf = false"
                >3회</el-radio
              >
              <el-radio
                v-model="bookingLimit"
                :label="4"
                @change="isBookingLimitSelf = false"
                >4회</el-radio
              >
              <div v-if="isBookingLimitSelf">
                <el-input-number
                  v-model.number="bookingLimit"
                  :min="5"
                ></el-input-number>
              </div>
              <div v-else>
                <el-radio
                  v-model="bookingLimit"
                  :label="5"
                  @change="isBookingLimitSelf = true"
                  >직접 입력</el-radio
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 당일 예약 변경 -->
      <div class="create-form-block">
        <div class="create-form-block__index">08</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">당일 예약 변경</div>
            <div class="create-form-block__label__check">
              <el-checkbox v-model="isUseDailyBookingChangeLimit"
                >사용함</el-checkbox
              >
            </div>
          </div>
          <div class="create-form-block__input">
            회원은 당일 수업 예약을 최대
            <el-input-number
              v-model.number="dailyBookingChangeLimit"
              :disabled="!isUseDailyBookingChangeLimit"
              :min="1"
              :max="maxCoupon"
            ></el-input-number
            >까지 예약 변경 가능 합니다. 당일 수업 예약을 최대 변경 가능한
            횟수입니다.
          </div>
        </div>
      </div>

      <!-- 예약 가능한 시간 설정 -->
      <div class="create-form-block">
        <div class="create-form-block__index">09</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">
              예약 가능한 시간 설정
            </div>
            <div class="create-form-block__label__check">
              <el-checkbox v-model="isUseBookingTime">사용함</el-checkbox>
            </div>
          </div>
          <div
            class="create-form-block__input hours-input"
            style="display: flex"
          >
            <el-time-select
              v-model="bookingStartTime"
              align="center"
              placeholder="시작시각"
              :disabled="!isUseBookingTime"
              style="width: 120px"
            ></el-time-select>
            <span
              style="
                align-self: flex-end;
                font-size: 20px;
                font-weight: 300;
                margin: 0 12px;
              "
              >~</span
            >
            <el-time-select
              v-model="bookingEndTime"
              align="center"
              placeholder="종료시각"
              :disabled="!isUseBookingTime"
              style="width: 120px"
            ></el-time-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="bottom-action-bar">
      <span @click="$router.push('/ticket')" style="cursor: pointer">
        <i
          class="el-icon-arrow-left"
          style="font-size: 14px; margin-right: 8px"
        />뒤로가기
      </span>
      <div class="space"></div>
      <el-button @click="onSubmit" style="color: black"
        >수강권 등록 완료</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { warningAlert } from '@/util/ui';
import '@/css/CustomRadio.scss';
import '@/css/Create.scss';
import { User } from '@/store/user/types';
import { Studio } from '@/store/studio/types';

const userNamespace = 'user';
const ticketNamespace = 'ticket';

@Component
export default class TicketCard extends Vue {
  data() {
    return {
      classType: 'GROUP',
      classTypeOptions: [
        {
          label: '그룹형 수업 전용',
          value: 'GROUP',
        },
        {
          label: '프라이빗형 수업 전용',
          value: 'PRIVATE',
        },
      ],
      title: '',
      description: '',
      maxCoupon: 10,
      maxCancel: 10,
      availableDays: 30,
      isAvailableDaysSelf: false,
      maxTrainee: 4,
      price: 0,
      bookingLimitCriteria: 'week',
      bookingLimit: 0,
      bookingLimitOptions1: [
        {
          label: '제한없음',
          value: 0,
        },
        {
          label: '1회',
          value: 1,
        },
        {
          label: '2회',
          value: 2,
        },
      ],
      bookingLimitOptions2: [
        {
          label: '3회',
          value: 3,
        },
        {
          label: '4회',
          value: 4,
        },
        {
          label: '직접 입력',
          value: -1,
        },
      ],
      isBookingLimitSelf: false,
      isUseDailyBookingChangeLimit: false,
      dailyBookingChangeLimit: 0,
      isUseBookingTime: false,
      bookingStartTime: null,
      bookingEndTime: null,
    };
  }

  get user(): User {
    return this.$store.getters[`${userNamespace}/getUser`];
  }

  get studio(): Studio {
    return this.$store.getters[`${userNamespace}/getStudio`];
  }

  async onSubmit() {
    if (!this.$data.title) {
      warningAlert('01. 수강권 명을 입력해 주세요.');
      return;
    }
    if (!this.$data.description) {
      warningAlert('02. 설명을 입력해 주세요.');
      return;
    }
    if (!this.$data.maxTrainee) {
      warningAlert('05. 수강 인원을 입력해 주세요.');
      return;
    }
    if (!this.$data.description) {
      warningAlert('06. 판매가를 입력해 주세요.');
      return;
    }
    if (
      this.$data.isUseBookingTime &&
      (!this.$data.bookingStartTime || !this.$data.bookingEndTime)
    ) {
      warningAlert('09. 예약 가능한 시간을 입력해 주세요.');
      return;
    }

    let bookingLimitPerWeek = 0;
    let bookingLimitPerMonth = 0;

    if (this.$data.bookingLimitCriteria === 'week') {
      bookingLimitPerWeek = this.$data.bookingLimit;
    } else if (this.$data.bookingLimitCriteria === 'month') {
      bookingLimitPerMonth = this.$data.bookingLimit;
    }

    let dailyBookingChangeLimit = 0;
    if (this.$data.isUseDailyBookingChangeLimit) {
      dailyBookingChangeLimit = this.$data.dailyBookingChangeLimit;
    }

    let bookingStartTime = 0;
    let bookingEndTime = 0;
    if (this.$data.isUseBookingTime) {
      bookingStartTime = this.$data.bookingStartTime;
      bookingEndTime = this.$data.bookingEndTime;
    }

    try {
      console.log(this.studio);
      await this.$store.dispatch(`${ticketNamespace}/saveTicket`, {
        studioId: this.studio.id,
        classType: this.$data.classType,
        title: this.$data.title,
        description: this.$data.description,
        price: this.$data.price,
        maxTrainee: this.$data.maxTrainee,
        maxCoupon: this.$data.maxCoupon,
        maxCancel: this.$data.maxCancel,
        availableDays: this.$data.availableDays,
        bookingLimitPerWeek,
        bookingLimitPerMonth,
        dailyBookingChangeLimit,
        bookingStartTime,
        bookingEndTime,
        isSelling: true,
      });
      this.$router.push({ path: '/ticket' });
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style scoped>
@import '../../css/CustomRadio.scss';
@import '../../css/Create.scss';
.create-form-block__coupon-count {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 200px));
  grid-gap: 12px;
}
.create-form-block__price-input .el-input__inner {
  padding-right: 30px;
  text-align: right;
}
.create-form-block__weekly-booking-limit {
  display: grid;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: start;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  margin-top: 12px;
  max-width: 480px;
}
</style>
