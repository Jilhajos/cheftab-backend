export class CreateTableDto {
  tableNumber: number;
  seats: number;
  section: 'main' | 'outdoor' | 'private';
}
