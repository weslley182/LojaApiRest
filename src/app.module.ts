import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ExceptionHttpFilter } from './common/filters/exception-http.filter';
import { TransformResponseInterceptor } from './core/http/transform-response.interceptor';

@Module({
  imports: [UserModule, ProductModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass:ExceptionHttpFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ]
})
export class AppModule {}
