import camelCase from "./camelCase";

export function getGeneratorClass(type: string) {
    return require(`${__dirname}/../generators/${camelCase(type)}DocGenerator`).default;
}

export default getGeneratorClass;