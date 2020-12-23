declare var M;
export class MaterializeServices {
  static tooast(message: string) {
    M.toast({ html: message });
  }
}
