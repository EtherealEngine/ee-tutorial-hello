import { ECS } from '@etherealengine/ecs'
import { PhysicsSystem } from '@etherealengine/spatial/src/physics/PhysicsModule'
import { NameComponent } from '@etherealengine/spatial/src/common/NameComponent'
import { VisibleComponent } from '@etherealengine/spatial/src/renderer/components/VisibleComponent'
import { TransformComponent } from '@etherealengine/spatial/src/transform/components/TransformComponent'
import { PrimitiveGeometryComponent } from '@etherealengine/engine/src/scene/components/PrimitiveGeometryComponent'
import { Vector3 } from 'three'
import { GeometryTypeEnum } from '@etherealengine/engine/src/scene/constants/GeometryTypeEnum'


let initialized = false    // Track whether our code was already run or not

// Our new function
function hello() {
  if (initialized) return
  initialized = true

  // Create the Sphere object inside our function.
  const entity = ECS.createEntity()
  ECS.setComponent(entity, NameComponent, 'hello-world')
  ECS.setComponent(entity, VisibleComponent)
  ECS.setComponent(entity, TransformComponent, { position: new Vector3(0, 1, 0) })
  ECS.setComponent(entity, PrimitiveGeometryComponent, { geometryType: GeometryTypeEnum.SphereGeometry })
}

// Define our System
export const HelloWorldSystem = ECS.defineSystem({
  uuid: 'helloworld.system',
  execute: hello,
  insert: { after: PhysicsSystem }
})
