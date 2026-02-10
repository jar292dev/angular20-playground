/**
 * Clase de ejemplo para representar un fragmento de código con su lenguaje asociado.
 */

class ExampleClass {
  private code: string;
  private language: string;

    constructor(code: string, language: string) {
        this.code = code;
        this.language = language;
    }

    getCode(): string {
        return this.code;
    }

    getLanguage(): string {
        return this.language;
    }

}