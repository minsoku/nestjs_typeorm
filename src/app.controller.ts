import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@gmail.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      where: {
        // 아닌 경우 가져오기
        // id: Not(1),
        // 적은 경우 가져오기
        // id: LessThan(30)
        // 작은 경우 or 같은 경우
        // id: LessThanOrEqual(30)
        // 많은 경우
        // id: MoreThan(30)
        // 많은 경우 or 같은 경우
        // id: MoreThanOrEqual(30),
        // 같은 경우
        // id: Equal(30)
        // 유사값
        // email: Like('%0%'),
        // 대문자 소문자 구분 안 하는 유사값
        // email: ILike('%GMail%')
        // 사이값
        // id: Between(1,2)
        // 해당되는 여러개의 값
        id: In([1, 2, 3]),
      },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티만 가져오게 된다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updateAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      // 필터링 할 조건을 입력
      // 전부다 and 조건
      // where: {
      //   version: 1,
      // },
      // or 조건으로 하려면 list로 넣어야함
      // where: [
      //   {
      //     id: 3,
      //   },
      //   {
      //     version: 1,
      //   },
      // ],
      // 관계를 가져오는 법
      // relations: {
      //   profile: true,
      // },
      //오름차순 내림차순
      // ASC
      // DESC
      // order: {
      //   id: 'ASC',
      // },
      // // 처음 몇 개를 제외하는지
      // skip: 1,
      // 몇 개를 가져올지 default 0 전부 다
      // take: 0,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    console.log(id);
    await this.profileRepository.delete(+id);
  }

  @Post('/user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asd@naver.com',
      profile: {
        profileImg: 'asd.png',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asd.png',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'post@gmail.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }
  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'nestjs',
    });
    const post2 = await this.postRepository.save({
      title: 'programming',
    });

    const tag1 = await this.tagRepository.save({
      name: 'js',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'ts',
      posts: [post1],
    });
    const post3 = await this.postRepository.save({
      title: 'nextjs',
      tags: [tag1, tag2],
    });

    return true;
  }
  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }
  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
