import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성
  //
  // @PrimaryGeneratedColumn()
  // Primary Column은 모든 테이블에서 기본적으로 존재해야함
  // 테이블 안에서 각각의 Row를 구분 할 수 있는 칼럼이다.
  // @PrimaryColumn()
  //
  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneratedColumn -> 순서대로 위로 올라감
  // 1, 2, 3, 4, 5 -> 9999999999
  //
  // UUID
  // askldhaos0-dasdashioadso-dfnjksroir4-dnflnadlfk
  @PrimaryGeneratedColumn()
  id: number;

  // 제목
  @Column()
  title: string;

  // 데이터 생성일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힘.ㄴ
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힘.
  @UpdateDateColumn()
  updateAt: Date;

  // 데이터가 업데이트 될 때마다 1씩 올라감
  // 처음 생성되면 값은 1임
  // save() 함수가 몇 번 불렸는지 기억을 함
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;
}
