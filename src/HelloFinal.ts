import { ECS } from '@etherealengine/ecs'
import { PrimitiveGeometryComponent } from '@etherealengine/engine/src/scene/components/PrimitiveGeometryComponent'
import { GeometryTypeEnum } from '@etherealengine/engine/src/scene/constants/GeometryTypeEnum'
import { PhysicsSystem } from '@etherealengine/spatial'
import { NameComponent } from '@etherealengine/spatial/src/common/NameComponent'
import { VisibleComponent } from '@etherealengine/spatial/src/renderer/components/VisibleComponent'
import { TransformComponent } from '@etherealengine/spatial/src/transform/components/TransformComponent'
import { Vector3 } from 'three'

// Define our component
export const HelloComponent = ECS.defineComponent({
  name: 'ee.tutorial.HelloComponent',
  jsonID: 'EE_tutorial_hello',

  onInit() { return { initialized: false } }
})

// Define the query that will find our Scene's Entity
const helloQuery = ECS.defineQuery([HelloComponent])

const executeHello = () => {
  for (const entity of helloQuery()) {
    // Check if we have already initialized our code
    let { initialized } = ECS.getMutableComponent(entity, HelloComponent)
    if (initialized.value) continue
    initialized.set(true)

    // Set the entity Components
    // 1. Redundant, just for clarity. They are provided by the premade scene we are using.
    ECS.setComponent(entity, NameComponent, 'ee.tutorial.hello-entity')
    ECS.setComponent(entity, VisibleComponent)
    // 2. The entity provided has a TransformComponent, but we want to update its position value
    ECS.setComponent(entity, TransformComponent, { position: new Vector3(0, 1, 0) })
    // 3. Required for our behavior. Sets the geometry type on first call, and updates it on each consecutive call.
    ECS.setComponent(entity, PrimitiveGeometryComponent, { geometryType: GeometryTypeEnum.SphereGeometry })
  }
}

// Define our system
export const HelloWorldSystem = ECS.defineSystem({
  uuid: 'ee.tutorial.HelloWorldSystem',
  execute: executeHello,
  insert: { after: PhysicsSystem }
})

