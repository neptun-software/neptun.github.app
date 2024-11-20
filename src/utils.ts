import { z } from "zod";

/**
 * Filters an object to only include properties that are defined in the given Zod schema.
 * 
 * @template T - A ZodObject type used to define the schema for filtering.
 * @param {Record<string, any>} obj - The object to be filtered.
 * @param {T} schema - The Zod schema object that defines the allowed properties.
 * @returns {z.infer<T>} A new object containing only the properties that exist in the schema.
 */
export function filterToSchemaProperties<T extends z.ZodObject<any>>(
    obj: Record<string, any>,
    schema: T
): z.infer<T> {
    const schemaShape = schema.shape;
    const allowedKeys = Object.keys(schemaShape);

    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => allowedKeys.includes(key))
    ) as z.infer<T>;
}

/**
 * Recursively filters the `source` object to only include properties that are
 * present in the `filter` object. If a property is an object itself, it will
 * only be included if there are remaining nested properties after filtering.
 * Does not modify the original objects.
 * @returns The filtered object with only the properties that were present in
 * the filter object.
 */
export function keepMatchingProperties(source: Record<string, any>, filter: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in source) {
        // Only proceed if the property exists in filter object
        if (!(key in filter)) {
            continue;
        }

        const value = source[key];
        const filterValue = filter[key];

        // Handle nested objects recursively
        if (value && typeof value === 'object' && !Array.isArray(value) &&
            filterValue && typeof filterValue === 'object') {
            const nestedResult = keepMatchingProperties(value, filterValue);
            // Only keep the property if there are remaining nested properties
            if (Object.keys(nestedResult).length > 0) {
                result[key] = nestedResult;
            }
        } else {
            result[key] = value;
        }
    }

    return result;
}
