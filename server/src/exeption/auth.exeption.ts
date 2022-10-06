// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { HttpArgumentsHost } from '@nestjs/common/interfaces';
// import { WsException } from '@nestjs/websockets';
// import { Request, Response } from 'express';

// @Catch()
// export class AuthExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {


//     if (host.getType() === 'http') {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest<Request>();
//         const status = exception.getStatus();
//         console.log();
        
//         throw new HttpException('http', HttpStatus.BAD_REQUEST)
//       } else if (host.getType() === "ws") {
//         const ctx = host.switchToWs();
//         console.log();
//         throw new WsException('ws error auth')
//       } 


//   }

  
// }