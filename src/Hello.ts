import { ECS } from '@etherealengine/ecs'
import { PhysicsSystem } from '@etherealengine/engine/src/physics/PhysicsModule'
import { TransformComponent } from '@etherealengine/engine/src/transform/components/TransformComponent'
import { PrimitiveGeometryComponent } from '@etherealengine/engine/src/scene/components/PrimitiveGeometryComponent'
import { createSceneEntity } from '@etherealengine/engine/src/ecs/functions/createSceneEntity'

let initialized = false
const hello = () => {
  if(initialized) return
  initialized = true

  const entity = createSceneEntity('hello-world', null,)
  ECS.setComponent(entity, PrimitiveGeometryComponent, { geometryType: 1 })
  ECS.getComponent(entity,TransformComponent).position.set(x,y,z)
}

export default async function worldInjection() {
  export const HelloWorldSystem = ECS.defineSystem({
    uuid: 'hellworld.system',
    execute: hello,
    insert: { after: PhysicsSystem }
  })
}

