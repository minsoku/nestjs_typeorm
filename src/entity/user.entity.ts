import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

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

  @Column()
  email: string;

  // // 제목
  // @Column({
  //   // 데이터베이스에서 인지하는 칼럼 타입
  //   // 자동으로 유추됨
  //   type: 'varchar',
  //   // 데이터베이스 칼럼 이름
  //   // 프로퍼티 이름으로 자동 유추됨
  //   name: 'title',
  //   // 값의 길이
  //   // 입력 할 수 있는 글자의 길이가 300
  //   length: 300,
  //   // null이 가능한지
  //   nullable: true,
  //   // true면 처음 저장할 때만 값 지정 가능
  //   // 이후에는 값 변경 불가능
  //   update: true,
  //   // find()를 실행할 때 기본으로 값을 불러올지
  //   // 기본값이 true
  //   select: true,
  //   // 기본 값
  //   // 아무것도 입력 안 했을 때 기본으로 입력되게 되는 값
  //   default: 'default value',
  //   // 칼럼중에서 유일무이한 값이 되어야하는지
  //   // 이메일 ?
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힘.
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

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행할 때마다 항상 같이 가져올 relation, default는 false임
    eager: true,
    // 저장할 때 relation을 한 번에 같이 저장가능
    cascade: true,
    // null이 가능한지, default는 true
    nullable: true,
    // 관계가 삭제됐을 때
    // no action -> 아무것도 안 함
    // cascade -> 참조하는 Row도 같이 삭제
    // set null -> 참조하는 Row에서 참조 id를 null로 변경
    // set default -> 기본 세팅으로 설정 (테이블의 기본 세팅)
    // restrict -> 참조하고 있는 Row가 있는 경우 참조당하는 Row 삭제 불가
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
