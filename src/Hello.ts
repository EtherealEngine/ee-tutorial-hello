import { ECS } from '@etherealengine/ecs'
import { PrimitiveGeometryComponent } from '@etherealengine/engine/src/scene/components/PrimitiveGeometryComponent'
import { GeometryTypeEnum } from '@etherealengine/engine/src/scene/constants/GeometryTypeEnum'
import { PhysicsSystem } from '@etherealengine/spatial'
import { NameComponent } from '@etherealengine/spatial/src/common/NameComponent'
import { VisibleComponent } from '@etherealengine/spatial/src/renderer/components/VisibleComponent'
import { TransformComponent } from '@etherealengine/spatial/src/transform/components/TransformComponent'
import { Vector3 } from 'three'

// Define our component
const HelloComponent = ECS.defineComponent({
  name: 'ee.hello-tutorial.HelloComponent',
  jsonID: 'ee.hello-tutorial.HelloComponent',

  onInit() {
    return { initialized: false }
  }
})

// Define our query
const helloQuery = ECS.defineQuery([HelloComponent])

const execute = () => {
  for (const entity of helloQuery()) {
    const { initialized } = ECS.getComponent(entity, HelloComponent)
    if (initialized) continue

    ECS.getMutableComponent(entity, HelloComponent).initialized.set(true)

    ECS.setComponent(entity, NameComponent, 'hello-world')
    ECS.setComponent(entity, VisibleComponent)
    ECS.setComponent(entity, TransformComponent, { position: new Vector3(0, 1, 0) })
    ECS.setComponent(entity, PrimitiveGeometryComponent, { geometryType: GeometryTypeEnum.SphereGeometry })
    ECS.setComponent(entity, HelloComponent, { initialized: true })
  }
}

// Define our system
const HelloWorldSystem = ECS.defineSystem({
  uuid: 'helloworld.system',
  execute,
  insert: { after: PhysicsSystem }
})

export { HelloComponent, HelloWorldSystem }
