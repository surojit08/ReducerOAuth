import { TokenIntrospectionService } from "../../Services/index.js";

const tokenIntrospect = async (req, res, next) => {
  try {
    const { token } = req.body;
    const tokenIntrospectionService = new TokenIntrospectionService(token);
    const introspectionResult = await tokenIntrospectionService.introspect();
    res.status(201).json({ ...introspectionResult });
  } catch (error) {
    return next(error);
  }
};

export { tokenIntrospect };
