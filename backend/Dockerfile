   FROM public.ecr.aws/lambda/nodejs:18
   
   COPY package*.json ${LAMBDA_TASK_ROOT}/
   RUN pnpm install
   
   COPY . ${LAMBDA_TASK_ROOT}
   RUN pnpm run build
   
   CMD [ "dist/index.handler" ]
