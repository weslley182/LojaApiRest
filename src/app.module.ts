import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ExceptionHttpFilter } from './common/filters/exception-http.filter';

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
    }
  ]
})
export class AppModule {}
