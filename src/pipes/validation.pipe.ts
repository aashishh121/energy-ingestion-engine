import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import joi from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {
    constructor(private readonly schema: joi.ObjectSchema) { }
    async transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}