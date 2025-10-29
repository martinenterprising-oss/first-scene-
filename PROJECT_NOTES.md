# Halloween 2025 Scene - Project Notes

## Проект
- Decentraland сцена "Halloween 2025" 
- SDK 7
- 9 парселей (3x3 сетка)

## Текущие объекты в сцене
- Moody Dead Tree (мертвое дерево) - позиция (34.25, 0, 15)
- night_cemetery._fountain (ночной фонтан) - позиция (15.25, 6.25, 26), масштаб 0.1

## Доступные ассеты
- bear_bush/HWN20_BearBush.glb (медвежий куст) - НЕ используется
- moody_dead_tree/Tree_Dead_03/Tree_Dead_03.glb (мертвое дерево)
- night_cemetery._fountain/night_cemetery._fountain.glb (фонтан)

## Настройки
- Небо: фиксированное время 78000 (ночь)
- Спавн: (9, 9, 9)
- Рейтинг: A (взрослый)

## Команды
- Запуск preview: `npm start` (из папки проекта)
- Неправильная команда: `npx @dcl/cli@latest start` (не работает)

## Статус
- Код в src/index.ts пустой (только export function main() {})
- Объекты настроены через main.composite
- Готов к дальнейшей разработке
