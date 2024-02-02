import { ECS } from '@etherealengine/ecs'
import { PhysicsSystem } from '@etherealengine/spatial/src/physics/PhysicsModule'
import { TransformComponent } from '@etherealengine/spatial/src/transform/components/TransformComponent'
import { PrimitiveGeometryComponent } from '@etherealengine/engine/src/scene/components/PrimitiveGeometryComponent'

let initialized = false
const hello = () => {
  if(initialized) return
  initialized = true

  const entity = ECS.createSceneEntity('hello-world', null,)
  ECS.setComponent(entity, PrimitiveGeometryComponent, { geometryType: 1 })
  ECS.getComponent(entity, TransformComponent).position.set(0,1,0)
}

export const HelloWorldSystem = ECS.defineSystem({
  uuid: 'hellworld.system',
  execute: hello,
  insert: { after: PhysicsSystem }
})

export default async function worldInjection() {}

