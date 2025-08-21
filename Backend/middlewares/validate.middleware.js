import z from 'zod';

const formatSchema = z.object({
    email: z.string().email().max(40, { message: "Password must be 20 or fewer characters long" }).toLowerCase(),
    password: z.string()
        .min(8, { message: "Password must be 8 or more characters long" })
        .max(20, { message: "Password must be 20 or fewer characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }),
    firstname: z.string()
        .min(3, { message: "Name must be 3 or more characters long" })
        .max(20, { message: "Name must be 20 or fewer characters long" })
        .optional(),
    lastname: z.string()
        .min(3, { message: "Name must be 3 or more characters long" })
        .max(20, { message: "Name must be 20 or fewer characters long" })
        .optional(),
    color: z.string()
        .max(20, { message: "Color must be 20 or fewer characters long" })
        .optional(),
    numberPlate: z.string()
        .optional(),
    type : z.enum(['car', 'bike', 'auto'])
        .optional(),
    model: z.string()
        .optional(),
    capacity:   z.number()
        .min(2, { message: "Capacity must be at least 2" })
        .max(10, { message: "Capacity must be at most 10" })
        .optional()
});

function validate(req, res, next){
    const parsedBody = formatSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.errors.map(err => err.message)
        });
    }
    req.body = parsedBody.data;
    next();
}

export default validate;